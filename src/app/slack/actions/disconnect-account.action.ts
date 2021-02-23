import { App, ButtonAction } from '@slack/bolt';
import { AccountTokenService } from 'src/services/account-token.service';
import { ensureDefined } from 'src/utils/assertions';
import { ApaleoWebhookApiService } from 'src/apaleo/apaleo-webhook-api.service';
import { ChannelSubscriptionService } from 'src/services/channel-subscription.service';
import { somethingWentWrongArguments } from 'src/utils/static';

export const register = (app: App) => {
  app.action(
    { action_id: 'disconnect_account' },
    async ({ ack, payload, body, client, respond }) => {
      const accountCode = (payload as ButtonAction).value;
      await ack();

      try {
        const teamId = ensureDefined(body.team && body.team.id);
        const channelId = ensureDefined(body.channel && body.channel.id);
        const userId = body.user.id;

        const accountSubscriptions = await new ChannelSubscriptionService(
          teamId
        ).getByAccountCode(accountCode);

        const apaleoApiService = new ApaleoWebhookApiService(
          teamId,
          accountCode
        );
        for (const subscription of accountSubscriptions) {
          await apaleoApiService.unsubscribeFromWebhooks(
            subscription.channelId
          );
        }

        const service = new AccountTokenService(teamId);
        const accountToken = await service.getByAccountCode(accountCode);
        await service.deleteById(accountToken.id);

        await client.chat.postEphemeral({
          channel: channelId,
          user: userId,
          text: `Account \`${accountCode}\` has been disconnected successfully`
        });
      } catch (e: unknown) {
        /* eslint-disable-next-line no-console */
        console.error(e);
        await respond(somethingWentWrongArguments);
      }
    }
  );
};
