import { ActionsBlock, Block, Button, KnownBlock } from '@slack/bolt';
import { SlackBlockIds } from 'src/models/enums';
import { AccountDetailsModel, AccountViewState } from 'src/models/interfaces';
import { MarkupBuilder } from './markup-builder';

export const pickOneAccountMarkup = (
  accounts: AccountDetailsModel[],
  sourceBlockId: SlackBlockIds,
  viewState?: string
): Markup => {
  const builder = new MarkupBuilder().addContextBlock('Pick one account');

  accounts.map(acc => {
    if (acc.isSubscribed) {
      builder.addSectionBlock(`*${acc.name}* (subscribed)`);
    } else {
      const button: Button = {
        type: 'button',
        action_id: 'select_account',
        value: JSON.stringify({
          accountCode: acc.code,
          value: viewState
        } as AccountViewState),
        text: {
          type: 'plain_text',
          text: acc.name
        }
      };
      const actions: ActionsBlock = {
        block_id: `${sourceBlockId}_${acc.code}`,
        type: 'actions',
        elements: [button]
      };
      builder.addCustomBlock(actions);
    }
    builder.addDividerBlock();
  });

  return builder.build();
};

export interface Markup {
  blocks: (KnownBlock | Block)[];
}
