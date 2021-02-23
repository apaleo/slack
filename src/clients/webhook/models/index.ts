import * as coreHttp from "@azure/core-http";

export interface MessageItemCollection {
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly messages?: string[];
}

export interface SubscriptionResponseModel {
  id: string;
  topic?: TopicEnum;
  topics: TopicEnum[];
  endpoint?: string;
  endpointUrl: string;
  created: Date;
  propertyId?: string;
  propertyIds: string[];
}

export interface CreateSubscriptionRequestModel {
  /**
   * Endpoint to which notifications will be sent to
   */
  endpointUrl: string;
  /**
   * Topic to subscribe. Deprecated, use Topics list instead. Deprecation date 14/01/2020.
   */
  topic?: TopicEnum;
  /**
   * Deprecated, use PropertyIds list to filter by properties. Deprecation date 14/01/2020. Id of the property for which the subscription is configured.
   */
  propertyId?: string;
  /**
   * Subscribe to events from the provided topics
   */
  topics?: TopicEnum[];
  /**
   * List of Ids for the properties for which the subscription is configured
   * If the list is empty then the webhooks will be delivered for all properties.
   */
  propertyIds?: string[];
}

/**
 * The reason behind this model which is basically the same old SubscriptionCreatedResponseModel
 * is that in the old implementation of notifications, the Id property was called SubscriptionId,
 * and in order to keep consistency with the Apaleo environment
 * the property should be called Id for the new implementation of webhooks.
 */
export interface CreateSubscriptionResponseModel {
  id?: string;
}

export interface ErrorResponseModel {
  type?: ErrorTypeEnum;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly message?: string;
}

export interface ReplaceSubscriptionModel {
  endpointUrl: string;
  topics?: TopicEnum[];
  propertyIds?: string[];
}

/**
 * Defines values for TopicEnum.
 */
export type TopicEnum =
  | "Reservation"
  | "Folio"
  | "Invoice"
  | "RatePlan"
  | "Group"
  | "Block"
  | "Unit"
  | "NightAudit"
  | "Fiscalization"
  | "Booking"
  | "Company"
  | "UnitGroup";
/**
 * Defines values for ErrorTypeEnum.
 */
export type ErrorTypeEnum =
  | "HealthcheckFailed"
  | "EnabledForAnotherEndpoint"
  | "InvalidPropertyId";

/**
 * Optional parameters.
 */
export interface WebhookAPIPingerPostOptionalParams
  extends coreHttp.OperationOptions {
  url?: string;
}

/**
 * Contains response data for the pingerPost operation.
 */
export type WebhookAPIPingerPostResponse = MessageItemCollection & {
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
 * Contains response data for the subscriptionsGet operation.
 */
export type WebhookAPISubscriptionsGetResponse = SubscriptionResponseModel[] & {
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
    parsedBody: SubscriptionResponseModel[];
  };
};

/**
 * Contains response data for the subscriptionsPost operation.
 */
export type WebhookAPISubscriptionsPostResponse = CreateSubscriptionResponseModel & {
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
    parsedBody: CreateSubscriptionResponseModel;
  };
};

/**
 * Contains response data for the subscriptionsByIdGet operation.
 */
export type WebhookAPISubscriptionsByIdGetResponse = SubscriptionResponseModel & {
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
    parsedBody: SubscriptionResponseModel;
  };
};

/**
 * Contains response data for the subscriptionsByIdPut operation.
 */
export type WebhookAPISubscriptionsByIdPutResponse = MessageItemCollection & {
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
 * Contains response data for the subscriptionsByIdDelete operation.
 */
export type WebhookAPISubscriptionsByIdDeleteResponse = MessageItemCollection & {
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
export interface WebhookAPIOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
