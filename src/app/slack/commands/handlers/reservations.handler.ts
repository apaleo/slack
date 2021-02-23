import { SlashCommand } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { ApaleoCoreApiService } from 'src/apaleo/apaleo-core-api.service';
import { AccountTokenService } from 'src/services/account-token.service';
import { SlackBlockIds } from 'src/models/enums';
import {
  AccountTokenNotFoundException,
  MultipleAccountTokensAvailableException
} from 'src/utils/exceptions';
import { NotConfiguredSlashException } from 'src/slack/commands/utils/exceptions';
import { Markup, pickOneAccountMarkup } from 'src/slack/views/common.blocks';
import { reservationsMarkup } from 'src/slack/views/reservations.blocks';
import { AccountDetailsModel } from 'src/models/interfaces';

export async function handleReservations({
  client,
  payload,
  textSearch,
  locale
}: {
  client: WebClient;
  payload: SlashCommand;
  textSearch: string;
  locale: string;
}) {
  let markup: Markup;
  const {
    teamId = payload.team_id,
    channelId = payload.channel_id,
    userId = payload.user_id
  } = payload;

  try {
    const apaleoApiService = new ApaleoCoreApiService(teamId);
    const reservations = await apaleoApiService.getReservations(textSearch);
    markup = reservationsMarkup(reservations, locale);
  } catch (e: unknown) {
    /* eslint-disable-next-line no-console */
    console.log(e);
    if (e instanceof MultipleAccountTokensAvailableException) {
      const accounts = (await new AccountTokenService(teamId).getAll()).map(
        x => {
          return {
            code: x.accountCode,
            name: x.accountName
          } as AccountDetailsModel;
        }
      );
      markup = pickOneAccountMarkup(
        accounts,
        SlackBlockIds.CMD_RESERVATIONS,
        textSearch
      );
    } else if (e instanceof AccountTokenNotFoundException) {
      throw new NotConfiguredSlashException();
    } else {
      throw e;
    }
  }

  await client.chat.postEphemeral({
    channel: channelId,
    user: userId,
    blocks: markup.blocks,
    text: ''
  });
}
