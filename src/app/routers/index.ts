import { Router } from 'express';
import * as apaleoOAuth from './apaleo-oauth';
import * as apaleoWebhook from './apaleo-webhook';

export const enableRoutes = (router: Router) => {
  apaleoOAuth.enableRoutes(router);

  apaleoWebhook.enableRoutes(router);

  router.get('/health', (_, res) => {
    res.send('OK');
  });
};
