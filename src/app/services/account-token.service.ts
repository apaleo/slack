import { AccountToken } from 'src/entity/AccountToken';
import {
  AccountTokenNotFoundException,
  MultipleAccountTokensAvailableException
} from 'src/utils/exceptions';
import { DeleteResult, getManager } from 'typeorm';

export class AccountTokenService {
  private readonly repo = getManager().getRepository(AccountToken);

  constructor(private readonly teamId: string) {}

  public getAll(): Promise<AccountToken[]> {
    return this.repo.find({
      where: {
        team: { id: this.teamId }
      }
    });
  }

  public async getIfSingle(): Promise<AccountToken> {
    const items = await this.repo.find({
      where: {
        team: { id: this.teamId }
      }
    });
    if (items.length > 1) {
      throw new MultipleAccountTokensAvailableException();
    } else if (items.length === 0) {
      throw new AccountTokenNotFoundException();
    }

    return items[0];
  }

  public tryGetByAccountCode(
    accountCode: string
  ): Promise<AccountToken | undefined> {
    return this.repo.findOne({
      where: {
        team: { id: this.teamId },
        accountCode
      }
    });
  }

  public async getByAccountCode(accountCode: string): Promise<AccountToken> {
    try {
      return await this.repo.findOneOrFail({
        where: {
          team: { id: this.teamId },
          accountCode
        }
      });
    } catch {
      throw new AccountTokenNotFoundException();
    }
  }

  public async getSubscribedAccounts(
    channelId: string
  ): Promise<AccountToken[]> {
    return (
      await this.repo.find({
        relations: ['channelSubscriptions'],
        where: {
          team: { id: this.teamId }
        }
      })
    ).filter(x => x.channelSubscriptions.find(y => y.channelId === channelId));
  }

  public save(entity: AccountToken): Promise<AccountToken> {
    return this.repo.save(entity);
  }

  public deleteById(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
