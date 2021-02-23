import { AccountToken } from 'src/entity/AccountToken';
import {
  apaleoApiBaseUrl,
  apaleoWebhookBaseUrl,
  apaleoWebhookAuthToken,
  serverUrl
} from 'src/settings';
import { sleep } from 'src/utils/helpers';
import { ApaleoBookingAPI } from 'clients/booking';
import { AccountModel } from 'clients/account/models';
import { ApaleoAccountAPI } from 'clients/account';
import { ReservationListModel, ReservationModel } from 'clients/booking/models';
import { CreateSubscriptionResponseModel } from 'clients/webhook/models';
import { WebhookAPI } from 'clients/webhook';
import { ApaleoApiException } from 'src/utils/exceptions';
import {
  httpCreatedStatusCode,
  httpNoContentStatusCode,
  httpNotFoundStatusCode,
  httpOkStatusCode,
  httpUnauthorizedStatusCode,
  retryDelayInMs
} from 'src/utils/static';
import { ApaleoOAuthTokenCredential } from './apaleo-oauth-token-credential';

export class ApaleoApiProxy {
  private readonly maxRetry = 2;
  private readonly apiBaseUrl = apaleoApiBaseUrl;
  private readonly webhookBaseUrl = apaleoWebhookBaseUrl;
  private readonly tokenCredential: ApaleoOAuthTokenCredential;

  public readonly accountCode: string;

  constructor(accountToken: AccountToken) {
    this.accountCode = accountToken.accountCode;
    this.tokenCredential = new ApaleoOAuthTokenCredential(accountToken);
  }

  public getReservations(
    textSearch: string,
    pageNumber: number,
    pageSize: number
  ): Promise<ReservationListModel> {
    return this.callWithRetry(async () => {
      const api = new ApaleoBookingAPI(this.tokenCredential, this.apiBaseUrl);

      const result = await api.bookingReservationsGet({
        textSearch,
        pageNumber,
        pageSize
      });

      if (result._response.status !== httpOkStatusCode) {
        throw new ApaleoApiException(result._response);
      }

      return result;
    }, this.maxRetry);
  }

  public getReservationById(id: string): Promise<ReservationModel> {
    return this.callWithRetry(async () => {
      const api = new ApaleoBookingAPI(this.tokenCredential, this.apiBaseUrl);

      const result = await api.bookingReservationsByIdGet(id);

      if (result._response.status !== httpOkStatusCode) {
        throw new ApaleoApiException(result._response);
      }

      return result;
    }, this.maxRetry);
  }

  public getCurrentAccount(): Promise<AccountModel | undefined> {
    return this.callWithRetry(async () => {
      const api = new ApaleoAccountAPI(this.tokenCredential, this.apiBaseUrl);

      const result = await api.accountAccountsCurrentGet();

      if (result._response.status === httpNotFoundStatusCode) {
        return undefined;
      } else if (result._response.status !== httpOkStatusCode) {
        throw new ApaleoApiException(result._response);
      }

      return result;
    }, this.maxRetry);
  }

  public subscribeForWebhooks(): Promise<CreateSubscriptionResponseModel> {
    return this.callWithRetry(async () => {
      const api = new WebhookAPI(this.tokenCredential, this.webhookBaseUrl);

      const result = await api.subscriptionsPost({
        endpointUrl: `${serverUrl}/apaleo-webhook?token=${apaleoWebhookAuthToken}`,
        topics: ['Reservation', 'NightAudit']
      });

      if (result._response.status !== httpCreatedStatusCode) {
        throw new ApaleoApiException(result._response);
      }

      return result;
    }, this.maxRetry);
  }

  public unsubscribeFromWebhooks(id: string): Promise<boolean> {
    return this.callWithRetry(async () => {
      const api = new WebhookAPI(this.tokenCredential, this.webhookBaseUrl);

      const result = await api.subscriptionsByIdDelete(id);

      if (result._response.status === httpNotFoundStatusCode) {
        return false;
      } else if (result._response.status !== httpNoContentStatusCode) {
        throw new ApaleoApiException(result._response);
      }

      return true;
    }, this.maxRetry);
  }

  private async callWithRetry<T>(
    fn: () => Promise<T>,
    maxTries: number
  ): Promise<T> {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof ApaleoApiException) {
        if (maxTries > 1 && e.response.status === httpUnauthorizedStatusCode) {
          await this.tokenCredential.refreshTokens();
          await sleep(retryDelayInMs);

          return this.callWithRetry(fn, maxTries - 1);
        }
      }

      /* eslint-disable-next-line no-console */
      console.log(e);
      throw e;
    }
  }
}
