import { SubscriptionDetailsModel } from 'src/models/interfaces';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const newAccountSubscribedMarkup = (accountCode: string): Markup => {
  return new MarkupBuilder()
    .addSectionBlock(
      `You've subscribed \`${accountCode}\` apaleo account.\n` +
        `From now the notifications from apaleo will pop up in this channel.`
    )
    .addDividerBlock()
    .build();
};

export const accountUnsubscribedMarkup = (accountCode: string): Markup => {
  return new MarkupBuilder()
    .addSectionBlock(
      `You've unsubscribed \`${accountCode}\` apaleo account.\n` +
        `From now the notifications from apaleo will not pop up in this channel.`
    )
    .addDividerBlock()
    .build();
};

export const listSubscriptionsMarkup = (
  subscriptions: SubscriptionDetailsModel[]
): Markup => {
  const markup = new MarkupBuilder().addContextBlock('Subscriptions');

  subscriptions.map(sub => {
    markup
      .addSectionBlock(
        `#${sub.channelName}\n` + `\`${sub.accountCodes.join('`, `')}\``
      )
      .addDividerBlock();
  });

  return markup.build();
};
