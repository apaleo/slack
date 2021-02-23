import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { WebhookAPIContext } from "./webhookAPIContext";
import {
  WebhookAPIOptionalParams,
  WebhookAPIPingerPostOptionalParams,
  WebhookAPIPingerPostResponse,
  WebhookAPISubscriptionsGetResponse,
  CreateSubscriptionRequestModel,
  WebhookAPISubscriptionsPostResponse,
  WebhookAPISubscriptionsByIdGetResponse,
  ReplaceSubscriptionModel,
  WebhookAPISubscriptionsByIdPutResponse,
  WebhookAPISubscriptionsByIdDeleteResponse
} from "./models";

export class WebhookAPI extends WebhookAPIContext {
  /**
   * Initializes a new instance of the WebhookAPI class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    $host: string,
    options?: WebhookAPIOptionalParams
  ) {
    super(credentials, $host, options);
  }

  /**
   * <br>You need to be authorized (no particular scope required)
   * @param options The options parameters.
   */
  pingerPost(
    options?: WebhookAPIPingerPostOptionalParams
  ): Promise<WebhookAPIPingerPostResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      pingerPostOperationSpec
    ) as Promise<WebhookAPIPingerPostResponse>;
  }

  /**
   * <br>You need to be authorized (no particular scope required)
   * @param options The options parameters.
   */
  subscriptionsGet(
    options?: coreHttp.OperationOptions
  ): Promise<WebhookAPISubscriptionsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      subscriptionsGetOperationSpec
    ) as Promise<WebhookAPISubscriptionsGetResponse>;
  }

  /**
   * Creating webhook subscriptions through swagger is disabled.
   * In order to create a subscription you must do it directly from your application.
   * To learn more visit: https://apaleo.dev/guides/start/webhook/
   *
   * After creating the subscription, apaleo sends a ping to the endpoint.
   * If the response is not OK, the subscription will not be enabled and error returned
   * @param body Subscription details
   * @param options The options parameters.
   */
  subscriptionsPost(
    body: CreateSubscriptionRequestModel,
    options?: coreHttp.OperationOptions
  ): Promise<WebhookAPISubscriptionsPostResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      subscriptionsPostOperationSpec
    ) as Promise<WebhookAPISubscriptionsPostResponse>;
  }

  /**
   * <br>You need to be authorized (no particular scope required)
   * @param id
   * @param options The options parameters.
   */
  subscriptionsByIdGet(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<WebhookAPISubscriptionsByIdGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      subscriptionsByIdGetOperationSpec
    ) as Promise<WebhookAPISubscriptionsByIdGetResponse>;
  }

  /**
   * Update a subscription by subscription id.
   * @param id Subscription id
   * @param body Subscription details
   * @param options The options parameters.
   */
  subscriptionsByIdPut(
    id: string,
    body: ReplaceSubscriptionModel,
    options?: coreHttp.OperationOptions
  ): Promise<WebhookAPISubscriptionsByIdPutResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, body, options: operationOptions },
      subscriptionsByIdPutOperationSpec
    ) as Promise<WebhookAPISubscriptionsByIdPutResponse>;
  }

  /**
   * <br>You need to be authorized (no particular scope required)
   * @param id Subscription's ID
   * @param options The options parameters.
   */
  subscriptionsByIdDelete(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<WebhookAPISubscriptionsByIdDeleteResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      subscriptionsByIdDeleteOperationSpec
    ) as Promise<WebhookAPISubscriptionsByIdDeleteResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const pingerPostOperationSpec: coreHttp.OperationSpec = {
  path: "/v1/pinger",
  httpMethod: "POST",
  responses: {
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
  queryParameters: [Parameters.url],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const subscriptionsGetOperationSpec: coreHttp.OperationSpec = {
  path: "/v1/subscriptions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "SubscriptionResponseModel" }
          }
        }
      }
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
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept1],
  serializer
};
const subscriptionsPostOperationSpec: coreHttp.OperationSpec = {
  path: "/v1/subscriptions",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.CreateSubscriptionResponseModel
    },
    400: {},
    401: {},
    403: {},
    404: {},
    415: {},
    422: {
      bodyMapper: Mappers.ErrorResponseModel
    },
    500: {},
    503: {}
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept2],
  mediaType: "json",
  serializer
};
const subscriptionsByIdGetOperationSpec: coreHttp.OperationSpec = {
  path: "/v1/subscriptions/{id}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SubscriptionResponseModel
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
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept1],
  serializer
};
const subscriptionsByIdPutOperationSpec: coreHttp.OperationSpec = {
  path: "/v1/subscriptions/{id}",
  httpMethod: "PUT",
  responses: {
    200: {},
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
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept3],
  mediaType: "json",
  serializer
};
const subscriptionsByIdDeleteOperationSpec: coreHttp.OperationSpec = {
  path: "/v1/subscriptions/{id}",
  httpMethod: "DELETE",
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
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
