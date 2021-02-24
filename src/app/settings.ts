import { ensureDefined } from './utils/assertions';

export const localPort: number = parseInt(
  ensureDefined(process.env.SERVER_PORT),
  10
);
export const serverUrl = process.env.SERVER_URL;
export const slack = {
  signingSecret: ensureDefined(process.env.SLACK_SIGNING_SECRET),
  clientId: ensureDefined(process.env.SLACK_CLIENT_ID),
  clientSecret: ensureDefined(process.env.SLACK_CLIENT_SECRET),
  stateSecret: ensureDefined(process.env.SLACK_INSTALLER_STATE_SECRET)
};
export const apaleoAuth = {
  issuerUrl: 'https://identity.apaleo.com',
  clientId: ensureDefined(process.env.APALEO_CLIENT_ID),
  clientSecret: ensureDefined(process.env.APALEO_CLIENT_SECRET),
  callbackUrl: `${process.env.SERVER_URL}/auth-callback`
};
export const apaleoWebhookAuthToken = ensureDefined(
  process.env.APALEO_WEBHOOK_AUTH_TOKEN
);
export const apaleoApiBaseUrl = 'https://api.apaleo.com';
export const apaleoWebhookBaseUrl = 'https://webhook.apaleo.com';
export const apaleoUIBaseUrl = 'https://app.apaleo.com';
