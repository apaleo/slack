import { Router } from 'express';
import { httpTempRedirectStatusCode } from 'src/utils/static';
import * as apaleoOAuth from './apaleo-oauth';
import * as apaleoWebhook from './apaleo-webhook';

export const enableRoutes = (router: Router, installUrl: string) => {
  apaleoOAuth.enableRoutes(router);

  apaleoWebhook.enableRoutes(router);

  router.get('/direct-install', (_, res) => {
    return res.redirect(httpTempRedirectStatusCode, installUrl);
  });

  router.get('/health', (_, res) => {
    return res.send('OK');
  });
};
