import { SlashCommand } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { ApaleoWebhookApiService } from 'src/apaleo/apaleo-webhook-api.service';
import { SlackBlockIds } from 'src/models/enums';
import { AccountDetailsModel } from 'src/models/interfaces';
import { AccountTokenService } from 'src/services/account-token.service';
import { Markup, pickOneAccountMarkup } from 'src/slack/views/common.blocks';
import { accountUnsubscribedMarkup } from 'src/slack/views/subscribe.blocks';
import {
  AccountTokenNotFoundException,
  ChannelSubscriptionNotFoundException,
  MultipleAccountTokensAvailableException
} from 'src/utils/exceptions';
import {
  NotConfiguredSlashException,
  NotSubscribedToChannelSlashException
} from '../utils/exceptions';

export async function handleUnsubscribe({
  client,
  payload
}: {
  client: WebClient;
  payload: SlashCommand;
  botToken: string;
}) {
  let markup: Markup;
  const {
    teamId = payload.team_id,
    channelId = payload.channel_id,
    channelName = payload.channel_name,
    userId = payload.user_id
  } = payload;

  try {
    const unsubscribedAccountCode = await new ApaleoWebhookApiService(
      teamId
    ).unsubscribeFromWebhooks(channelId);
    markup = accountUnsubscribedMarkup(unsubscribedAccountCode);
  } catch (e: unknown) {
    /* eslint-disable-next-line no-console */
    console.log(e);
    if (e instanceof MultipleAccountTokensAvailableException) {
      const accountTokenService = new AccountTokenService(teamId);
      const subscribedAccounts = await accountTokenService.getSubscribedAccounts(
        channelId
      );
      const accountsToShow = (await accountTokenService.getAll())
        .filter(x =>
          subscribedAccounts.find(y => y.accountCode === x.accountCode)
        )
        .map(x => {
          return {
            code: x.accountCode,
            name: x.accountName
          } as AccountDetailsModel;
        });
      markup = pickOneAccountMarkup(
        accountsToShow,
        SlackBlockIds.CMD_UNSUBSCRIBE
      );
    } else if (e instanceof ChannelSubscriptionNotFoundException) {
      throw new NotSubscribedToChannelSlashException(channelName);
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
