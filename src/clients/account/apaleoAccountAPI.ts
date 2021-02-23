import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { ApaleoAccountAPIContext } from "./apaleoAccountAPIContext";
import {
  ApaleoAccountAPIOptionalParams,
  ApaleoAccountAPIAccountAccountsCurrentGetResponse,
  ReplaceAccountModel,
  ApaleoAccountAPIAccountAccountsCurrentPutResponse,
  ApaleoAccountAPIAccountAccountsGetOptionalParams,
  ApaleoAccountAPIAccountAccountsGetResponse,
  CreateAccountModel,
  ApaleoAccountAPIAccountAccountsPostOptionalParams,
  ApaleoAccountAPIAccountAccountsPostResponse,
  ApaleoAccountAPIAccountActionsCurrentSuspendPutResponse
} from "./models";

export class ApaleoAccountAPI extends ApaleoAccountAPIContext {
  /**
   * Initializes a new instance of the ApaleoAccountAPI class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    $host: string,
    options?: ApaleoAccountAPIOptionalParams
  ) {
    super(credentials, $host, options);
  }

  /**
   * Retrieves information about the current account.<br>You need to be authorized (no particular scope
   * required)
   * @param options The options parameters.
   */
  accountAccountsCurrentGet(
    options?: coreHttp.OperationOptions
  ): Promise<ApaleoAccountAPIAccountAccountsCurrentGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      accountAccountsCurrentGetOperationSpec
    ) as Promise<ApaleoAccountAPIAccountAccountsCurrentGetResponse>;
  }

  /**
   * Completely replaces an account with the new definition passed in. The old data will be lost.<br>You
   * must have this scope: 'account.manage'.
   * @param body The definition of the account.
   * @param options The options parameters.
   */
  accountAccountsCurrentPut(
    body: ReplaceAccountModel,
    options?: coreHttp.OperationOptions
  ): Promise<ApaleoAccountAPIAccountAccountsCurrentPutResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      accountAccountsCurrentPutOperationSpec
    ) as Promise<ApaleoAccountAPIAccountAccountsCurrentPutResponse>;
  }

  /**
   * Get the list of accounts.<br>You must have this scope: 'accounts.read'.
   * @param options The options parameters.
   */
  accountAccountsGet(
    options?: ApaleoAccountAPIAccountAccountsGetOptionalParams
  ): Promise<ApaleoAccountAPIAccountAccountsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      accountAccountsGetOperationSpec
    ) as Promise<ApaleoAccountAPIAccountAccountsGetResponse>;
  }

  /**
   * Use this call to create a new account.<br>You must have this scope: 'account.create'.
   * @param body The definition of the account.
   * @param options The options parameters.
   */
  accountAccountsPost(
    body: CreateAccountModel,
    options?: ApaleoAccountAPIAccountAccountsPostOptionalParams
  ): Promise<ApaleoAccountAPIAccountAccountsPostResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      accountAccountsPostOperationSpec
    ) as Promise<ApaleoAccountAPIAccountAccountsPostResponse>;
  }

  /**
   * Suspends the current account.
   * This changes the account type to 'Suspended'.<br>You must have this scope: 'account.suspend'.
   * @param options The options parameters.
   */
  accountActionsCurrentSuspendPut(
    options?: coreHttp.OperationOptions
  ): Promise<ApaleoAccountAPIAccountActionsCurrentSuspendPutResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      accountActionsCurrentSuspendPutOperationSpec
    ) as Promise<ApaleoAccountAPIAccountActionsCurrentSuspendPutResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const accountAccountsCurrentGetOperationSpec: coreHttp.OperationSpec = {
  path: "/account/v1/accounts/current",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccountModel
    },
    400: {},
    401: {},
    403: {},
    404: {},
    422: {
      bodyMapper: Mappers.MessageItemCollection
    },
    500: {},
    503: {}
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const accountAccountsCurrentPutOperationSpec: coreHttp.OperationSpec = {
  path: "/account/v1/accounts/current",
  httpMethod: "PUT",
  responses: {
    200: {},
    204: {},
    400: {},
    401: {},
    403: {},
    404: {},
    415: {},
    422: {
      bodyMapper: Mappers.MessageItemCollection
    },
    500: {},
    503: {}
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const accountAccountsGetOperationSpec: coreHttp.OperationSpec = {
  path: "/account/v1/accounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccountListModel
    },
    204: {},
    400: {},
    401: {},
    403: {},
    404: {},
    422: {
      bodyMapper: Mappers.MessageItemCollection
    },
    500: {},
    503: {}
  },
  queryParameters: [Parameters.accountCodes],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const accountAccountsPostOperationSpec: coreHttp.OperationSpec = {
  path: "/account/v1/accounts",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.AccountCreatedModel,
      headersMapper: Mappers.ApaleoAccountAPIAccountAccountsPostHeaders
    },
    400: {},
    401: {},
    403: {},
    404: {},
    415: {},
    422: {
      bodyMapper: Mappers.MessageItemCollection
    },
    500: {},
    503: {}
  },
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.idempotencyKey
  ],
  mediaType: "json",
  serializer
};
const accountActionsCurrentSuspendPutOperationSpec: coreHttp.OperationSpec = {
  path: "/account/v1/account-actions/current/suspend",
  httpMethod: "PUT",
  responses: {
    204: {},
    400: {},
    401: {},
    403: {},
    404: {},
    422: {
      bodyMapper: Mappers.MessageItemCollection
    },
    500: {},
    503: {}
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
