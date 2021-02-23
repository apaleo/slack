import { SlashCommand } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { ApaleoWebhookApiService } from 'src/apaleo/apaleo-webhook-api.service';
import { SlackBlockIds } from 'src/models/enums';
import { AccountDetailsModel } from 'src/models/interfaces';
import { AccountTokenService } from 'src/services/account-token.service';
import { Markup, pickOneAccountMarkup } from 'src/slack/views/common.blocks';
import { newAccountSubscribedMarkup } from 'src/slack/views/subscribe.blocks';
import {
  AccountAlreadySubscribedToChannelException,
  AccountTokenNotFoundException,
  MultipleAccountTokensAvailableException
} from 'src/utils/exceptions';
import {
  AlreadySubscribedSlashException,
  NotConfiguredSlashException
} from '../utils/exceptions';

export async function handleSubscribe({
  client,
  payload,
  botToken
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
    const subscribedAccountCode = await new ApaleoWebhookApiService(
      teamId
    ).subscribeForWebhooks({
      channelId,
      channelName,
      botToken
    });
    markup = newAccountSubscribedMarkup(subscribedAccountCode);
  } catch (e: unknown) {
    /* eslint-disable-next-line no-console */
    console.log(e);
    if (e instanceof MultipleAccountTokensAvailableException) {
      const accountTokenService = new AccountTokenService(teamId);
      const subscribedAccounts = await accountTokenService.getSubscribedAccounts(
        channelId
      );
      const accountsToShow = (await accountTokenService.getAll()).map(x => {
        return {
          code: x.accountCode,
          name: x.accountName,
          isSubscribed: subscribedAccounts.find(
            y => y.accountCode === x.accountCode
          )
            ? true
            : false
        } as AccountDetailsModel;
      });
      markup = pickOneAccountMarkup(
        accountsToShow,
        SlackBlockIds.CMD_SUBSCRIBE
      );
    } else if (e instanceof AccountAlreadySubscribedToChannelException) {
      throw new AlreadySubscribedSlashException(e.accountCode, channelName);
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
