import { App, ButtonAction } from '@slack/bolt';
import { ApaleoWebhookApiService } from 'src/apaleo/apaleo-webhook-api.service';
import {
  AlreadySubscribedSlashException,
  NotConfiguredSlashException
} from 'src/slack/commands/utils/exceptions';
import { SlackBlockIds } from 'src/models/enums';
import { AccountViewState } from 'src/models/interfaces';
import {
  AccountAlreadySubscribedToChannelException,
  AccountTokenNotFoundException
} from 'src/utils/exceptions';
import { ensureDefined } from 'src/utils/assertions';
import { somethingWentWrongArguments } from 'src/utils/static';
import { newAccountSubscribedMarkup } from '../views/subscribe.blocks';

export const register = (app: App) => {
  app.action(
    {
      action_id: 'select_account',
      block_id: new RegExp(`${SlackBlockIds.CMD_SUBSCRIBE}_.*`)
    },
    async ({ ack, payload, body, client, context, respond }) => {
      const viewState = JSON.parse(
        (payload as ButtonAction).value
      ) as AccountViewState;
      await ack();

      const botToken = context.botToken;
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
        await apaleoApiService.subscribeForWebhooks({
          channelId,
          channelName,
          botToken
        });
        const markup = newAccountSubscribedMarkup(accountCode);
        await client.chat.postEphemeral({
          channel: channelId,
          user: userId,
          blocks: markup.blocks,
          text: ''
        });
      } catch (e: unknown) {
        /* eslint-disable-next-line no-console */
        console.log(e);
        if (e instanceof AccountAlreadySubscribedToChannelException) {
          throw new AlreadySubscribedSlashException(e.accountCode, channelName);
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
