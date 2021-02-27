import { App, CodedError, ExpressReceiver } from '@slack/bolt';
import { Installation, InstallationStore } from '@slack/oauth';
import bodyParser from 'body-parser';
import { slack } from './settings';
import * as routers from './routers';
import { TeamInstallation } from './entity/TeamInstallation';
import { TeamInstallationService } from './services/team-installation.service';
import { ensureDefined } from './utils/assertions';

let slackApp: App;

async function saveTeamInstallation(
  id: string,
  installation: Installation<'v1' | 'v2'>
) {
  const teamInstallationService = new TeamInstallationService(id);
  let teamInstallation = await teamInstallationService.tryGetCurrent();
  if (!teamInstallation) {
    teamInstallation = new TeamInstallation().init({
      id,
      json: JSON.stringify(installation)
    });
    await teamInstallationService.save(teamInstallation);
  }
}

async function getTeamInstallation(id: string) {
  const teamInstallation = await new TeamInstallationService(id).getCurrent();

  return JSON.parse(teamInstallation.installationJson);
}

const installationStore: InstallationStore = {
  storeInstallation: installation => {
    if (installation.isEnterpriseInstall) {
      return saveTeamInstallation(
        ensureDefined(installation.enterprise).id,
        installation
      );
    } else {
      return saveTeamInstallation(
        ensureDefined(installation.team).id,
        installation
      );
    }
  },
  fetchInstallation: installQuery => {
    if (
      installQuery.isEnterpriseInstall &&
      installQuery.enterpriseId !== undefined
    ) {
      return getTeamInstallation(installQuery.enterpriseId);
    } else if (installQuery.teamId) {
      return getTeamInstallation(installQuery.teamId);
    } else {
      throw new Error('Failed fetching installation');
    }
  }
};

const initReceiver = async (): Promise<ExpressReceiver> => {
  const scopes = [
    'app_mentions:read',
    'commands',
    'chat:write',
    'chat:write.public',
    'users:read'
  ];
  const receiver = new ExpressReceiver({
    clientId: slack.clientId,
    clientSecret: slack.clientSecret,
    stateSecret: slack.stateSecret,
    signingSecret: slack.signingSecret,
    scopes,
    endpoints: {
      actions: '/api/slack/events',
      events: '/api/slack/events',
      commands: '/api/slack/commands'
    },
    installationStore
  });

  const installUrl = await ensureDefined(receiver.installer).generateInstallUrl({ scopes });
  receiver.router.use(bodyParser.json());
  routers.enableRoutes(receiver.router, installUrl);

  return receiver;
};

export const getSlackApp = async (): Promise<App> => {
  if (!slackApp) {
    slackApp = new App({
      clientId: slack.clientId,
      clientSecret: slack.clientSecret,
      receiver: await initReceiver()
    });
    /* eslint-disable-next-line require-await, @typescript-eslint/require-await */
    slackApp.error(async (error: CodedError) => {
      /* eslint-disable-next-line no-console */
      console.error(error);
    });
  }

  return slackApp;
};
