import { ActionsBlock, Button, SectionBlock } from '@slack/bolt';
import { AccountDetailsModel } from 'src/models/interfaces';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const configureMarkup = (loginUrl: string): Markup => {
  const button: Button = {
    type: 'button',
    action_id: 'configure_button',
    text: {
      type: 'plain_text',
      text: 'Connect apaleo account'
    },
    url: loginUrl
  };
  const actions: ActionsBlock = {
    type: 'actions',
    elements: [button]
  };

  return new MarkupBuilder().addCustomBlock(actions).build();
};

export const newAccountConfiguredMarkup = (
  name: string,
  accountCode: string
): Markup => {
  return new MarkupBuilder()
    .addSectionBlock(
      `Hi ${name}! Here is the list of available commands:\n` +
        `You've successfully connected \`${accountCode}\` apaleo account.`
    )
    .addDividerBlock()
    .addAvailableCommandsSectionBlock()
    .build();
};

export const listConfiguredAccountsMarkup = (
  accounts: AccountDetailsModel[]
): Markup => {
  const builder = new MarkupBuilder().addContextBlock('Accounts');

  accounts.map(acc => {
    const button: Button = {
      type: 'button',
      action_id: 'disconnect_account',
      value: acc.code,
      text: {
        type: 'plain_text',
        text: `Disconnect ${acc.name}`
      },
      style: 'danger'
    };
    const section: SectionBlock = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${acc.name}*\n${acc.code}`
      },
      accessory: button
    };
    builder.addCustomBlock(section).addDividerBlock();
  });

  return builder.build();
};
