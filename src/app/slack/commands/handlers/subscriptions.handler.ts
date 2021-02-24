import { groupBy } from 'lodash';
import { SlashCommand } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { ChannelSubscriptionService } from 'src/services/channel-subscription.service';
import { listSubscriptionsMarkup } from 'src/slack/views/subscribe.blocks';
import { SubscriptionDetailsModel } from 'src/models/interfaces';
import { ChannelSubscription } from 'src/entity/ChannelSubscription';
import { NoSubscriptionsFoundSlashException } from '../utils/exceptions';

export async function handleSubscriptions(
  client: WebClient,
  payload: SlashCommand
) {
  const {
    teamId = payload.team_id,
    channelId = payload.channel_id,
    userId = payload.user_id
  } = payload;

  const channelSubscriptions = await new ChannelSubscriptionService(
    teamId
  ).getAll();

  if (channelSubscriptions.length === 0) {
    throw new NoSubscriptionsFoundSlashException();
  }

  const groupedChannelSubscriptions = groupBy<ChannelSubscription>(
    channelSubscriptions,
    x => x.channelId
  );
  const subscriptions = Object.entries(groupedChannelSubscriptions).map(
    ([key, channelSubscription]) => {
      return {
        channelId: key,
        channelName: channelSubscription[0].channelName,
        accountCodes: channelSubscription.map(x => x.accountToken.accountCode)
      } as SubscriptionDetailsModel;
    }
  );

  const markup = listSubscriptionsMarkup(subscriptions);
  await client.chat.postEphemeral({
    channel: channelId,
    user: userId,
    blocks: markup.blocks,
    text: ''
  });
}
