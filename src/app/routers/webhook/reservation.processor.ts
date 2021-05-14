import { Dictionary } from 'lodash';
import { ChatPostMessageArguments, WebClient } from '@slack/web-api';
import { ApaleoCoreApiService } from 'src/apaleo/apaleo-core-api.service';
import { reservationCreatedMarkup } from 'src/slack/views/reservation-with-messages-created.blocks';
import { ApaleoRefreshTokenFailedException } from 'src/utils/exceptions';
import { ReservationModel } from 'clients/booking';
import { ChannelSubscription } from 'src/entity/ChannelSubscription';
import { reservationNoShowMarkup } from 'src/slack/views/reservation-no-show.blocks';
import { Markup } from 'src/slack/views/common.blocks';
import { WebhookReservationEventModel } from 'src/models/interfaces';
import { assertNever } from 'src/utils/assertions';

export async function processReservation(
  webhook: WebhookReservationEventModel,
  subscriptions: Dictionary<ChannelSubscription[]>
) {
  const chat = new WebClient().chat;
  for (const [teamId, teamSubscriptions] of Object.entries(subscriptions)) {
    const reservation = await getReservation({
      teamId,
      accountCode: webhook.accountId,
      entityId: webhook.data.entityId
    });
    if (!reservation) {
      return;
    }

    const markup = getMarkupFor(webhook, reservation);
    if (!markup) {
      return;
    }

    const messages: ChatPostMessageArguments[] = teamSubscriptions.map(
      subscription => ({
        token: subscription.botToken,
        channel: subscription.channelId,
        blocks: markup.blocks,
        text: ''
      })
    );

    for (const message of messages) {
      await chat.postMessage(message);
    }
  }
}

function getMarkupFor(
  webhook: WebhookReservationEventModel,
  reservation: ReservationModel
): Markup | undefined {
  switch (webhook.type) {
    case 'created':
      return reservationCreatedMarkup(reservation);
    case 'set-to-no-show':
      return reservationNoShowMarkup(reservation);
    default:
      assertNever(webhook.type, {
        message: `Invalid webhook type for processing: ${webhook.type}. Webhook topic: ${webhook.topic}`
      });

      return undefined;
  }
}

async function getReservation({
  teamId,
  accountCode,
  entityId
}: {
  teamId: string;
  accountCode: string;
  entityId: string;
}): Promise<ReservationModel | undefined> {
  try {
    return await new ApaleoCoreApiService(
      teamId,
      accountCode
    ).getReservationById(entityId);
  } catch (e: unknown) {
    if (e instanceof ApaleoRefreshTokenFailedException) {
      /* eslint-disable-next-line no-console */
      console.error(e); // let's threat it as errors for now, just to track how it works, later could be removed

      return undefined; // intentionally skip this type of error
    } else {
      /* eslint-disable-next-line no-console */
      console.error(e);
      throw e;
    }
  }
}
