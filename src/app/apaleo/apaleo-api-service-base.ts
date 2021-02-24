import { ApaleoApiProxy } from 'src/apaleo/apaleo-api-proxy';
import { AccountToken } from 'src/entity/AccountToken';
import { AccountTokenService } from 'src/services/account-token.service';

export class ApaleoApiServiceBase {
  private apiProxy?: ApaleoApiProxy;

  constructor(
    protected readonly teamId: string,
    protected readonly accountCode?: string
  ) {}

  protected async getApiProxy(): Promise<ApaleoApiProxy> {
    if (!this.apiProxy) {
      const accountTokenService = new AccountTokenService(this.teamId);
      let accountToken: AccountToken;
      if (this.accountCode) {
        accountToken = await accountTokenService.getByAccountCode(
          this.accountCode
        );
      } else {
        accountToken = await accountTokenService.getIfSingle();
      }
      this.apiProxy = new ApaleoApiProxy(accountToken);
    }

    return this.apiProxy;
  }
}
