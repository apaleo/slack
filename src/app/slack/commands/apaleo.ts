import { App, SlashCommand } from '@slack/bolt';
import { WebAPIPlatformError, WebClient } from '@slack/web-api';
import { somethingWentWrongMessage } from 'src/utils/static';
import { addLocaleContext } from '../middlewares';
import { helpMarkup } from '../views/help.blocks';
import * as handlers from './handlers';
import {
  AlreadySubscribedSlashException,
  NoSubscriptionsFoundSlashException,
  NotConfiguredSlashException,
  NotSubscribedToChannelSlashException
} from './utils/exceptions';

export const register = (app: App) => {
  app.command(
    '/apaleo',
    ({ payload, client, context, next }) =>
      addLocaleContext({ userId: payload.user_id, client, context, next }),
    async ({ ack, payload, context, respond, client }) => {
      await ack();
      try {
        await processCommand({
          client,
          payload,
          botToken: context.botToken,
          locale: context.locale
        });
      } catch (e: unknown) {
        /* eslint-disable-next-line no-console */
        console.log(e);
        let errorMessage: string;
        if (e instanceof NotConfiguredSlashException) {
          errorMessage =
            'Please configure first by typing: `/apaleo configure`';
        } else if (e instanceof AlreadySubscribedSlashException) {
          errorMessage = `Account \`${e.accountCode}\` is already subscribed to the channel #${e.channelName}`;
        } else if (e instanceof NotSubscribedToChannelSlashException) {
          errorMessage = `No subscriptions to the channel #${e.channelName} were found`;
        } else if (e instanceof NoSubscriptionsFoundSlashException) {
          errorMessage =
            "You don't have any subscriptions yet. To create one please type `/apaleo subscribe` in the desired channel";
        } else if (
          (e as WebAPIPlatformError)?.data?.error === 'not_in_channel'
        ) {
          errorMessage =
            'Please add apaleo app to the channel by typing: `/invite @apaleo` or simply `@apaleo`';
        } else if (
          (e as WebAPIPlatformError)?.data?.error === 'channel_not_found'
        ) {
          errorMessage =
            'Direct message conversations are not supported. Please use channels or `@apaleo` messages';
        } else if ((e as WebAPIPlatformError)?.data?.error) {
          /* eslint-disable-next-line no-console */
          console.error(e);
          errorMessage = `Error received: ${
            (e as WebAPIPlatformError).data?.error
          }`;
        } else {
          /* eslint-disable-next-line no-console */
          console.error(e);
          errorMessage = somethingWentWrongMessage;
        }
        await respond({
          text: errorMessage,
          mrkdwn: true,
          response_type: 'ephemeral'
        });
      }
    }
  );
};

async function processCommand({
  client,
  payload,
  botToken,
  locale
}: {
  client: WebClient;
  payload: SlashCommand;
  botToken: string;
  locale: string;
}) {
  const operationSplitted = payload.text.trim().split(' ');
  const operation = operationSplitted[0];
  switch (operation) {
    case 'configure':
      await handlers.handleConfigure(client, payload, botToken);
      break;
    case 'accounts':
      await handlers.handleAccounts(client, payload);
      break;
    case 'reservations':
      await handlers.handleReservations({
        client,
        payload,
        textSearch: payload.text.replace(operation, '').trim(),
        locale
      });
      break;
    case 'subscribe':
      await handlers.handleSubscribe({
        client,
        payload,
        botToken
      });
      break;
    case 'unsubscribe':
      await handlers.handleUnsubscribe({
        client,
        payload,
        botToken
      });
      break;
    case 'subscriptions':
      await handlers.handleSubscriptions(client, payload);
      break;
    case 'help':
      const markup = helpMarkup();
      await client.chat.postEphemeral({
        channel: payload.channel_id,
        user: payload.user_id,
        blocks: markup.blocks,
        text: ''
      });
      break;
    default:
      await client.chat.postEphemeral({
        channel: payload.channel_id,
        text: 'Unknown command',
        user: payload.user_id
      });
      break;
  }
}
