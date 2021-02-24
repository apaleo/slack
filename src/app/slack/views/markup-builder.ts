import { Block, ContextBlock, DividerBlock, SectionBlock } from '@slack/bolt';
import { Markup } from './common.blocks';

const availableCommandsText =
  '* `/apaleo configure`\n' +
  "To connect apaleo account. It's possible to configure multiple accounts.\n\n" +
  '* `/apaleo accounts`\n' +
  'Shows all connected apaleo accounts.\n\n' +
  '* `/apaleo reservations` _John_\n' +
  'Returns a list of reservations filtered by the followed text.\n\n' +
  '* `/apaleo subscribe`\n' +
  'Activates receiving notifications from apaleo in the selected channel.\n\n' +
  '* `/apaleo subscriptions`\n' +
  'Shows all subscribed accounts and channels.\n\n' +
  '* `/apaleo unsubscribe`\n' +
  'Stops receiving notifications from apaleo in the selected channel.\n\n';

export class MarkupBuilder {
  private readonly markup: Markup = { blocks: [] };

  public addContextBlock(text: string) {
    const block: ContextBlock = {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text
        }
      ]
    };
    this.markup.blocks.push(block);

    return this;
  }

  public addCustomBlock(custom: Block) {
    this.markup.blocks.push(custom);

    return this;
  }

  public addDividerBlock() {
    const block: DividerBlock = {
      type: 'divider'
    };
    this.markup.blocks.push(block);

    return this;
  }

  public addSectionBlock(text: string) {
    const block: SectionBlock = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text
      }
    };
    this.markup.blocks.push(block);

    return this;
  }

  public addAvailableCommandsSectionBlock() {
    return this.addSectionBlock(availableCommandsText);
  }

  public build(): Markup {
    return this.markup;
  }
}
