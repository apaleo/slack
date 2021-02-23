import { App, ButtonAction } from '@slack/bolt';
import { ApaleoWebhookApiService } from 'src/apaleo/apaleo-webhook-api.service';
import {
  NotConfiguredSlashException,
  NotSubscribedToChannelSlashException
} from 'src/slack/commands/utils/exceptions';
import { SlackBlockIds } from 'src/models/enums';
import { AccountViewState } from 'src/models/interfaces';
import {
  AccountTokenNotFoundException,
  ChannelSubscriptionNotFoundException
} from 'src/utils/exceptions';
import { ensureDefined } from 'src/utils/assertions';
import { somethingWentWrongArguments } from 'src/utils/static';
import { accountUnsubscribedMarkup } from '../views/subscribe.blocks';

export const register = (app: App) => {
  app.action(
    {
      action_id: 'select_account',
      block_id: new RegExp(`${SlackBlockIds.CMD_UNSUBSCRIBE}_.*`)
    },
    async ({ ack, payload, body, client, respond }) => {
      const viewState = JSON.parse(
        (payload as ButtonAction).value
      ) as AccountViewState;
      await ack();

      const teamId = ensureDefined(body.team && body.team.id);
      const channelId = ensureDefined(body.channel && body.channel.id);
      const channelName = ensureDefined(body.channel && body.channel.name);
      const userId = body.user.id;
      const accountCode = viewState.accountCode;

      try {
        const apaleoApiService = new ApaleoWebhookApiService(
          teamId,
          accountCode
        );
        const unsubscribedAccountCode = await apaleoApiService.unsubscribeFromWebhooks(
          channelId
        );
        const markup = accountUnsubscribedMarkup(unsubscribedAccountCode);
        await client.chat.postEphemeral({
          channel: channelId,
          user: userId,
          blocks: markup.blocks,
          text: ''
        });
      } catch (e: unknown) {
        /* eslint-disable-next-line no-console */
        console.log(e);
        if (e instanceof ChannelSubscriptionNotFoundException) {
          throw new NotSubscribedToChannelSlashException(channelName);
        } else if (e instanceof AccountTokenNotFoundException) {
          throw new NotConfiguredSlashException();
        } else {
          /* eslint-disable-next-line no-console */
          console.error(e);
          await respond(somethingWentWrongArguments);
        }
      }
    }
  );
};
