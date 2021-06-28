import * as coreHttp from "@azure/core-http";

export interface AccountModel {
  /**
   * The code for the account that can be shown in reports and table views
   */
  code: string;
  /**
   * The name for the account, which usually should be the company name
   */
  name: string;
  /**
   * The description for the account
   */
  description?: string;
  /**
   * The default language two-letter language code (ISO Alpha-2) for the account
   */
  defaultLanguage: string;
  /**
   * The URL of the account logo
   */
  logoUrl?: string;
  location?: AddressModel;
  /**
   * Type of the account
   */
  type: AccountType;
  /**
   * The list of supported countries
   */
  additionallySupportedCountries?: string[];
}

export interface AddressModel {
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  regionCode?: string;
  countryCode: string;
}

export interface MessageItemCollection {
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly messages?: string[];
}

/**
 * With this request you can modify an account
 */
export interface ReplaceAccountModel {
  /**
   * The name for the account, which usually should be the company name
   */
  name: string;
  /**
   * The description for the account
   */
  description?: string;
  /**
   * The URL of the account logo
   */
  logoUrl?: string;
  location?: CreateAddressModel;
  /**
   * The list of supported countries
   */
  additionallySupportedCountries?: string[];
}

export interface CreateAddressModel {
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  /**
   * The ISO 3166-2 code
   */
  regionCode?: string;
  /**
   * The country code, in ISO 3166-1 alpha-2 code
   */
  countryCode: string;
}

export interface AccountListModel {
  /**
   * List of accounts
   */
  accounts: AccountItemModel[];
  /**
   * Total count of items
   */
  count: number;
}

export interface AccountItemModel {
  /**
   * The code for the account that can be shown in reports and table views
   */
  code: string;
  /**
   * The name for the account, which usually should be the company name
   */
  name: string;
  /**
   * The description for the account
   */
  description?: string;
  /**
   * Type of the account
   */
  type: AccountType;
}

export interface CreateAccountModel {
  /**
   * The code for the account that can be shown in reports and table views. If not set, random one will be generated
   */
  code?: string;
  /**
   * The name for the account, which usually should be the company name
   */
  name: string;
  /**
   * The description for the account
   */
  description?: string;
  /**
   * The default language code for the account
   */
  defaultLanguage: string;
  /**
   * The URL of the account logo
   */
  logoUrl?: string;
  /**
   * Set the type of the account
   */
  type: AccountType;
  location?: CreateAddressModel;
  /**
   * The list of supported countries
   */
  additionallySupportedCountries?: string[];
}

export interface AccountCreatedModel {
  /**
   * Account code
   */
  code: string;
}

/**
 * Defines headers for ApaleoAccountAPI_accountAccountsPost operation.
 */
export interface ApaleoAccountAPIAccountAccountsPostHeaders {
  /**
   * The location of the created resource.
   */
  location?: string;
}

/**
 * Defines values for AccountType.
 */
export type AccountType = "Trial" | "Live" | "Suspended" | "Development";

/**
 * Contains response data for the accountAccountsCurrentGet operation.
 */
export type ApaleoAccountAPIAccountAccountsCurrentGetResponse = AccountModel & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AccountModel;
  };
};

/**
 * Contains response data for the accountAccountsCurrentPut operation.
 */
export type ApaleoAccountAPIAccountAccountsCurrentPutResponse = MessageItemCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MessageItemCollection;
  };
};

/**
 * Optional parameters.
 */
export interface ApaleoAccountAPIAccountAccountsGetOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Filter result by requested codes
   */
  accountCodes?: string[];
}

/**
 * Contains response data for the accountAccountsGet operation.
 */
export type ApaleoAccountAPIAccountAccountsGetResponse = AccountListModel & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AccountListModel;
  };
};

/**
 * Optional parameters.
 */
export interface ApaleoAccountAPIAccountAccountsPostOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Unique key for safely retrying requests without accidentally performing the same operation twice.
   * We'll always send back the same response for requests made with the same key,
   * and keys can't be reused with different request parameters. Keys expire after 24 hours.
   */
  idempotencyKey?: string;
}

/**
 * Contains response data for the accountAccountsPost operation.
 */
export type ApaleoAccountAPIAccountAccountsPostResponse = ApaleoAccountAPIAccountAccountsPostHeaders &
  AccountCreatedModel & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: AccountCreatedModel;
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ApaleoAccountAPIAccountAccountsPostHeaders;
    };
  };

/**
 * Contains response data for the accountActionsCurrentSuspendPut operation.
 */
export type ApaleoAccountAPIAccountActionsCurrentSuspendPutResponse = MessageItemCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MessageItemCollection;
  };
};

/**
 * Contains response data for the accountActionsCurrentLivePut operation.
 */
export type ApaleoAccountAPIAccountActionsCurrentLivePutResponse = MessageItemCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MessageItemCollection;
  };
};

/**
 * Optional parameters.
 */
export interface ApaleoAccountAPIOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
