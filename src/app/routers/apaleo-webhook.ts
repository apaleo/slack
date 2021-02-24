import { Dictionary, groupBy } from 'lodash';
import { Response, Router } from 'express';
import { getManager } from 'typeorm';
import { ChannelSubscription } from 'src/entity/ChannelSubscription';
import { apaleoWebhookAuthToken } from 'src/settings';
import { httpUnauthorizedStatusCode } from 'src/utils/static';
import {
  WebhookEventModel,
  WebhookNightAuditEventType,
  WebhookReservationEventType
} from 'src/models/interfaces';
import { assertNever } from 'src/utils/assertions';
import { processReservation } from './webhook/reservation.processor';
import { processNightAudit } from './webhook/night-audit.processor';

const reservationEventTypesForProcessing: WebhookReservationEventType[] = [
  'created',
  'set-to-no-show'
];
const nightAuditEventTypesForProcessing: WebhookNightAuditEventType[] = [
  'started',
  'succeeded',
  'failed'
];

export const enableRoutes = (router: Router) => {
  router.post('/apaleo-webhook', async (req, res) => {
    if (!req.query.token || req.query.token !== apaleoWebhookAuthToken) {
      return res.status(httpUnauthorizedStatusCode).send('Not authorized');
    }

    if (req.body.type === 'healthcheck') {
      return ok(res);
    }

    const webhook = req.body as WebhookEventModel;
    if (!isWebhookForProcessing(webhook)) {
      return ok(res);
    }

    const subscriptions = (
      await getManager().getRepository(ChannelSubscription).find()
    ).filter(x => x.accountToken.accountCode === webhook.accountId);
    if (subscriptions.length === 0) {
      return ok(res);
    }

    const groupedSubscriptions = groupBy<ChannelSubscription>(
      subscriptions,
      x => x.team.id
    );

    await process(webhook, groupedSubscriptions);

    return ok(res);
  });
};

async function process(
  webhook: WebhookEventModel,
  subscriptionsMap: Dictionary<ChannelSubscription[]>
): Promise<void> {
  switch (webhook.topic) {
    case 'Reservation':
      await processReservation(webhook, subscriptionsMap);
      break;
    case 'NightAudit':
      await processNightAudit(webhook, subscriptionsMap);
      break;
    default:
      assertNever(webhook, {
        message: `Invalid webhook topic for processing: ${webhook}`
      });
      break;
  }
}

function isWebhookForProcessing(webhook: WebhookEventModel): boolean {
  return (
    (webhook.topic === 'Reservation' &&
      reservationEventTypesForProcessing.includes(webhook.type)) ||
    (webhook.topic === 'NightAudit' &&
      nightAuditEventTypesForProcessing.includes(webhook.type))
  );
}

function ok(res: Response) {
  return res.send('OK');
}
