import { SlashCommand } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { AuthRequest } from 'src/entity/AuthRequest';
import { AuthRequestService } from 'src/services/auth-request.service';
import { TeamInstallationService } from 'src/services/team-installation.service';
import { serverUrl } from 'src/settings';
import { configureMarkup } from 'src/slack/views/configure.blocks';

export async function handleConfigure(
  client: WebClient,
  payload: SlashCommand,
  botToken: string
) {
  const {
    teamId = payload.team_id,
    channelId = payload.channel_id,
    userId = payload.user_id,
    appId = payload.api_app_id
  } = payload;

  const authRequestService = new AuthRequestService();
  let authRequest = await authRequestService.tryGetByUser(teamId, userId);
  if (!authRequest) {
    const team = await new TeamInstallationService(teamId).getCurrent();
    authRequest = new AuthRequest().init({
      team,
      userId,
      channelId,
      appId,
      botToken
    });
  } else {
    authRequest.userId = channelId;
    authRequest.channelId = channelId;
    authRequest.appId = appId;
    authRequest.botToken = botToken;
    authRequest.codeVerifier = undefined;
  }
  const savedAuthRequest = await authRequestService.save(authRequest);

  const markup = configureMarkup(
    `${serverUrl}/login/?state=${savedAuthRequest.id}`
  );
  await client.chat.postEphemeral({
    channel: channelId,
    user: userId,
    blocks: markup.blocks,
    text: ''
  });
}
