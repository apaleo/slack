import { ChannelSubscription } from 'src/entity/ChannelSubscription';
import { ChannelSubscriptionNotFoundException } from 'src/utils/exceptions';
import { DeleteResult, getManager } from 'typeorm';

export class ChannelSubscriptionService {
  private readonly repo = getManager().getRepository(ChannelSubscription);

  constructor(private readonly teamId: string) {}

  public getAll(): Promise<ChannelSubscription[]> {
    return this.repo.find({
      where: {
        team: { id: this.teamId }
      }
    });
  }

  public async tryGetByAccountCodeAndChannel({
    accountCode,
    channelId
  }: {
    accountCode: string;
    channelId: string;
  }): Promise<ChannelSubscription | undefined> {
    return (
      await this.repo.find({
        where: {
          team: { id: this.teamId },
          channelId
        }
      })
    ).find(x => x.accountToken.accountCode === accountCode);
  }

  public async getByAccountCodeAndChannel({
    accountCode,
    channelId
  }: {
    accountCode: string;
    channelId: string;
  }): Promise<ChannelSubscription> {
    const item = (
      await this.repo.find({
        where: {
          team: { id: this.teamId },
          channelId
        }
      })
    ).find(x => x.accountToken.accountCode === accountCode);
    if (item) {
      return item;
    } else {
      throw new ChannelSubscriptionNotFoundException();
    }
  }

  public async getByAccountCode(
    accountCode: string
  ): Promise<ChannelSubscription[]> {
    return (
      await this.repo.find({
        where: {
          team: { id: this.teamId }
        }
      })
    ).filter(x => x.accountToken.accountCode === accountCode);
  }

  public save(entity: ChannelSubscription): Promise<ChannelSubscription> {
    return this.repo.save(entity);
  }

  public deleteById(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
