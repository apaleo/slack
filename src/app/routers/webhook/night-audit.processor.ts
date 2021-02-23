import { Dictionary, flatten } from 'lodash';
import { ChatPostMessageArguments, WebClient } from '@slack/web-api';
import { ChannelSubscription } from 'src/entity/ChannelSubscription';
import { nightAuditStartedMarkup } from 'src/slack/views/night-audit-started.blocks';
import { Markup } from 'src/slack/views/common.blocks';
import { nightAuditSucceededMarkup } from 'src/slack/views/night-audit-succeeded.blocks';
import { nightAuditFailedMarkup } from 'src/slack/views/night-audit-failed.blocks';
import { WebhookNightAuditEventModel } from 'src/models/interfaces';
import { assertNever } from 'src/utils/assertions';

export async function processNightAudit(
  webhook: WebhookNightAuditEventModel,
  subscriptions: Dictionary<ChannelSubscription[]>
) {
  const markup = getMarkupFor(webhook);
  if (!markup) {
    return;
  }

  const messages: ChatPostMessageArguments[] = flatten(
    Object.values(subscriptions).map(teamSubscriptions =>
      teamSubscriptions.map(subscription => ({
        token: subscription.botToken,
        channel: subscription.channelId,
        blocks: markup.blocks,
        text: ''
      }))
    )
  );

  const chat = new WebClient().chat;
  for (const message of messages) {
    await chat.postMessage(message);
  }
}

function getMarkupFor(
  webhook: WebhookNightAuditEventModel
): Markup | undefined {
  const markupParams = {
    accountCode: webhook.accountId,
    propertyId: webhook.propertyId
  };
  switch (webhook.type) {
    case 'started':
      return nightAuditStartedMarkup(markupParams);
    case 'succeeded':
      return nightAuditSucceededMarkup(markupParams);
    case 'failed':
      return nightAuditFailedMarkup(markupParams);
    default:
      assertNever(webhook.type, {
        message: `Invalid webhook type for processing: ${webhook.type}. Webhook topic: ${webhook.topic}`
      });

      return undefined;
  }
}
