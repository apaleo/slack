import { Client, custom, Issuer } from 'openid-client';
import { apaleoAuth } from '../settings';

let oauthClient: Client;
const clockToleranceInSeconds = 3;

export const getOAuthClient = async (): Promise<Client> => {
  if (!oauthClient) {
    const apaIssuer = await Issuer.discover(apaleoAuth.issuerUrl);
    oauthClient = new apaIssuer.Client({
      client_id: apaleoAuth.clientId,
      client_secret: apaleoAuth.clientSecret,
      redirect_uris: [apaleoAuth.callbackUrl],
      response_types: ['code']
    });
    oauthClient[custom.clock_tolerance] = clockToleranceInSeconds;
  }

  return oauthClient;
};
