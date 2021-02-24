import { App } from '@slack/bolt';

export const register = (app: App) => {
  app.action('configure_button', async ({ ack, respond }) => {
    await ack();
    await respond({
      text: 'Please connect your apaleo account...',
      response_type: 'ephemeral'
    });
  });
};
