// eslint-disable-next-line import/no-unassigned-import
import 'reflect-metadata';
import { localPort } from './settings';
import * as actions from './slack/actions';
import * as commands from './slack/commands';
import * as events from './slack/events';
import { getSlackApp } from './slack-app';
import { initDatabaseConnection } from './app-helpers';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const app = await getSlackApp();

  actions.register(app);
  commands.register(app);
  events.register(app);

  await initDatabaseConnection();

  await app.start(localPort);

  /* eslint-disable-next-line no-console */
  console.log('⚡️ Slack bot is running!');
})();
