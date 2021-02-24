import { SlashCommand } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { AccountDetailsModel } from 'src/models/interfaces';
import { AccountTokenService } from 'src/services/account-token.service';
import { listConfiguredAccountsMarkup } from 'src/slack/views/configure.blocks';
import { NotConfiguredSlashException } from '../utils/exceptions';

export async function handleAccounts(client: WebClient, payload: SlashCommand) {
  const {
    teamId = payload.team_id,
    channelId = payload.channel_id,
    userId = payload.user_id
  } = payload;

  const accounts = (await new AccountTokenService(teamId).getAll()).map(x => {
    return {
      code: x.accountCode,
      name: x.accountName
    } as AccountDetailsModel;
  });
  if (accounts.length === 0) {
    throw new NotConfiguredSlashException();
  }

  const markup = listConfiguredAccountsMarkup(accounts);
  await client.chat.postEphemeral({
    channel: channelId,
    user: userId,
    blocks: markup.blocks,
    text: ''
  });
}
