import { App } from '@slack/bolt';
import { ApaleoWebhookApiService } from 'src/apaleo/apaleo-webhook-api.service';
import { ChannelSubscriptionService } from 'src/services/channel-subscription.service';
import { TeamInstallationService } from 'src/services/team-installation.service';
import { somethingWentWrongMessage } from 'src/utils/static';
import { homeView } from './views/home.view';

export const register = (app: App) => {
  app.event('app_home_opened', async ({ event, client, say }) => {
    try {
      await client.views.publish({
        user_id: event.user,
        view: homeView(event.user)
      });
    } catch (e: unknown) {
      /* eslint-disable-next-line no-console */
      console.error(e);
      await say(somethingWentWrongMessage);
    }
  });

  app.event('app_uninstalled', async ({ body }) => {
    try {
      const teamId = body.team_id;

      const subscriptions = await new ChannelSubscriptionService(
        teamId
      ).getAll();

      for (const subscription of subscriptions) {
        const apaleoApiService = new ApaleoWebhookApiService(
          teamId,
          subscription.accountToken.accountCode
        );

        await apaleoApiService.unsubscribeFromWebhooks(subscription.channelId);
      }

      const teamInstallationService = new TeamInstallationService(teamId);
      const installation = await teamInstallationService.tryGetCurrent();
      if (installation) {
        await teamInstallationService.deleteCurrent();
      }
      /* eslint-disable-next-line no-console */
      console.log(`App is uninstalled from team ${teamId}.`);
    } catch (e: unknown) {
      /* eslint-disable-next-line no-console */
      console.error(e);
    }
  });
};
