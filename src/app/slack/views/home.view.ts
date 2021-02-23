import { View } from '@slack/bolt';
import { MarkupBuilder } from './markup-builder';

export const homeView = (userName: string): View => {
  const markup = new MarkupBuilder()
    .addSectionBlock(`*Welcome home, <@${userName}> :house:*`)
    .addSectionBlock(
      ">>> You've successfully installed <https://apaleo.com|Apaleo> on this Slack workspace :tada: \n" +
        'To subscribe a channel to your apaleo account use the following slash command: \n' +
        '`/apaleo configure`'
    )
    .addDividerBlock()
    .addSectionBlock('> Looking for additional help? Try /apaleo help')
    .build();
  const view: View = {
    type: 'home',
    blocks: markup.blocks
  };

  return view;
};
