import { RespondArguments } from '@slack/bolt';

export const httpOkStatusCode = 200;
export const httpCreatedStatusCode = 201;
export const httpNoContentStatusCode = 204;
export const httpBadRequestStatusCode = 400;
export const httpUnauthorizedStatusCode = 401;
export const httpNotFoundStatusCode = 404;
export const httpInternalServerErrorStatusCode = 500;
export const retryDelayInMs = 1500;

export const somethingWentWrongMessage =
  'Oops! Something is wrong here. We are looking into it.';

export const somethingWentWrongArguments: RespondArguments = {
  text: somethingWentWrongMessage,
  response_type: 'ephemeral'
};
