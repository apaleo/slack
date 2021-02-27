import { Router } from 'express';
import * as apaleoOAuth from './apaleo-oauth';
import * as apaleoWebhook from './apaleo-webhook';

export const enableRoutes = (router: Router, installUrl: string) => {
  apaleoOAuth.enableRoutes(router);

  apaleoWebhook.enableRoutes(router);

  router.get('/direct-install', (_, res) => {
    return res.redirect(302, installUrl);
  });

  router.get('/health', (_, res) => {
    return res.send('OK');
  });
};
