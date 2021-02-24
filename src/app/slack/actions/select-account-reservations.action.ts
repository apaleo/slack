import { App, ButtonAction } from '@slack/bolt';
import { ApaleoCoreApiService } from 'src/apaleo/apaleo-core-api.service';
import { NotConfiguredSlashException } from 'src/slack/commands/utils/exceptions';
import { SlackBlockIds } from 'src/models/enums';
import { AccountViewState } from 'src/models/interfaces';
import { AccountTokenNotFoundException } from 'src/utils/exceptions';
import { ensureDefined } from 'src/utils/assertions';
import { somethingWentWrongMessage } from 'src/utils/static';
import { addLocaleContext } from '../middlewares';
import { reservationsMarkup } from '../views/reservations.blocks';

export const register = (app: App) => {
  app.action(
    {
      action_id: 'select_account',
      block_id: new RegExp(`${SlackBlockIds.CMD_RESERVATIONS}_.*`)
    },
    ({ body, client, context, next }) =>
      addLocaleContext({ userId: body.user.id, client, context, next }),
    async ({ ack, payload, body, client, context, respond }) => {
      const viewState = JSON.parse(
        (payload as ButtonAction).value
      ) as AccountViewState;
      await ack();

      try {
        const teamId = ensureDefined(body.team && body.team.id);
        const channelId = ensureDefined(body.channel && body.channel.id);
        const userId = body.user.id;

        const apaleoApiService = new ApaleoCoreApiService(
          teamId,
          viewState.accountCode
        );
        const reservations = await apaleoApiService.getReservations(
          viewState.value
        );
        const markup = reservationsMarkup(reservations, context.locale);
        await client.chat.postEphemeral({
          channel: channelId,
          user: userId,
          blocks: markup.blocks,
          text: ''
        });
      } catch (e: unknown) {
        /* eslint-disable-next-line no-console */
        console.log(e);
        if (e instanceof AccountTokenNotFoundException) {
          throw new NotConfiguredSlashException();
        } else {
          /* eslint-disable-next-line no-console */
          console.error(e);
          await respond({
            text: somethingWentWrongMessage,
            response_type: 'ephemeral'
          });
        }
      }
    }
  );
};
