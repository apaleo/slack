import { Router } from 'express';
import { generators } from 'openid-client';
import { AccountTokenService } from 'src/services/account-token.service';
import { AuthRequestService } from 'src/services/auth-request.service';
import { apaleoAuth } from 'src/settings';
import { getOAuthClient } from 'src/apaleo/oauth-client';
import { AccountToken } from 'src/entity/AccountToken';
import { getSlackApp } from 'src/slack-app';
import { ensureDefined } from 'src/utils/assertions';
import { newAccountConfiguredMarkup } from 'src/slack/views/configure.blocks';
import { ApaleoCoreApiService } from 'src/apaleo/apaleo-core-api.service';
import {
  httpBadRequestStatusCode,
  httpInternalServerErrorStatusCode,
  somethingWentWrongMessage
} from 'src/utils/static';
import { AuthRequestNotFoundException } from 'src/utils/exceptions';

export const enableRoutes = (router: Router) => {
  router.get('/login', async (req, res) => {
    if (!req.query.state) {
      return res.status(httpBadRequestStatusCode).send('Invalid request');
    }

    try {
      const authUrl = await buildAuthUrl(req.query.state as string);

      return res.send(`<a href="${authUrl}">[Connect apaleo account]</a>`);
    } catch (e: unknown) {
      if (e instanceof AuthRequestNotFoundException) {
        return res.status(httpBadRequestStatusCode).send('Invalid request');
      } else {
        /* eslint-disable-next-line no-console */
        console.error(e);

        return res
          .status(httpInternalServerErrorStatusCode)
          .send(somethingWentWrongMessage);
      }
    }
  });

  router.get('/auth-callback', async (req, res) => {
    const client = await getOAuthClient();
    const params = client.callbackParams(req);
    if (!params.state) {
      return res.status(httpBadRequestStatusCode).send('Invalid request');
    }

    try {
      const state = ensureDefined(params.state);
      const authRequestService = new AuthRequestService();
      const authRequest = await authRequestService.getById(state);

      const tokenSet = await client.callback(apaleoAuth.callbackUrl, params, {
        code_verifier: authRequest.codeVerifier,
        state
      });
      await authRequestService.deleteById(authRequest.id);

      const userInfo = await client.userinfo(tokenSet);
      const preferredUsername = ensureDefined(userInfo.preferred_username);
      const accountCode = userInfo.account_code as string;

      const teamId = authRequest.team.id;
      const accountTokenService = new AccountTokenService(teamId);
      let accountToken = await accountTokenService.tryGetByAccountCode(
        accountCode
      );
      if (!accountToken) {
        accountToken = new AccountToken().init({
          team: authRequest.team,
          accountCode
        });
      }
      accountToken.accessToken = ensureDefined(tokenSet.access_token);
      accountToken.refreshToken = ensureDefined(tokenSet.refresh_token);
      accountToken.expiresAt = tokenSet.expires_at;
      await accountTokenService.save(accountToken);

      const accountDetails = await new ApaleoCoreApiService(
        teamId,
        accountCode
      ).getCurrentAccount();

      accountToken.accountName = ensureDefined(accountDetails).name;
      await accountTokenService.save(accountToken);

      const authSuccessMarkup = newAccountConfiguredMarkup(
        preferredUsername,
        accountCode
      );
      await getSlackApp().client.chat.postEphemeral({
        token: authRequest.botToken,
        channel: authRequest.channelId,
        blocks: authSuccessMarkup.blocks,
        text: '',
        user: authRequest.userId
      });

      return res.send(
        'Successfully logged in! You can close this tab and return to Slack.'
      );
    } catch (e: unknown) {
      if (e instanceof AuthRequestNotFoundException) {
        return res.status(httpBadRequestStatusCode).send('Invalid request');
      } else {
        /* eslint-disable-next-line no-console */
        console.error(e);

        return res
          .status(httpInternalServerErrorStatusCode)
          .send(somethingWentWrongMessage);
      }
    }
  });
};

async function buildAuthUrl(state: string): Promise<string> {
  const authRequestService = new AuthRequestService();
  const authRequest = await authRequestService.getById(state);
  authRequest.codeVerifier = generators.codeVerifier();
  await authRequestService.save(authRequest);

  const client = await getOAuthClient();

  return client.authorizationUrl({
    scope: 'openid profile offline_access reservations.read',
    state: authRequest.id,
    code_challenge: generators.codeChallenge(authRequest.codeVerifier),
    code_challenge_method: 'S256'
  });
}
