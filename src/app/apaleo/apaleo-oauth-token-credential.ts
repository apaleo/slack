import { TokenSet } from 'openid-client';
import { AccessToken, TokenCredential } from '@azure/core-http';
import { AccountToken } from 'src/entity/AccountToken';
import { AccountTokenService } from 'src/services/account-token.service';
import { ensureDefined } from 'src/utils/assertions';
import { ApaleoRefreshTokenFailedException } from 'src/utils/exceptions';
import { getOAuthClient } from './oauth-client';

export class ApaleoOAuthTokenCredential implements TokenCredential {
  private accessToken: string;
  private refreshToken: string;
  private expiresAt: number;
  private readonly accountTokenService: AccountTokenService;

  constructor(private readonly accountToken: AccountToken) {
    this.setOAuth(this.accountToken);
    this.accountTokenService = new AccountTokenService(
      this.accountToken.team.id
    );
  }

  public getToken(_: string | string[]): Promise<AccessToken | null> {
    return new Promise(resolve => {
      resolve({
        token: this.accessToken,
        expiresOnTimestamp: this.expiresAt
      } as AccessToken);
    });
  }

  public async refreshTokens() {
    const client = await getOAuthClient();
    let newTokenSet: TokenSet;
    try {
      newTokenSet = await client.refresh(this.refreshToken);
    } catch (e) {
      throw new ApaleoRefreshTokenFailedException(e);
    }

    const accountToken = await this.updateAccountToken(newTokenSet);
    this.setOAuth(accountToken);
  }

  private updateAccountToken(tokenSet: TokenSet): Promise<AccountToken> {
    this.accountToken.accessToken = ensureDefined(tokenSet.access_token);
    this.accountToken.refreshToken = ensureDefined(tokenSet.refresh_token);
    this.accountToken.expiresAt = ensureDefined(tokenSet.expires_at);

    return this.accountTokenService.save(this.accountToken);
  }

  private setOAuth(accountToken: AccountToken) {
    this.accessToken = accountToken.accessToken;
    this.refreshToken = accountToken.refreshToken;
    this.expiresAt = ensureDefined(accountToken.expiresAt);
  }
}
