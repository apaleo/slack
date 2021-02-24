import { WebhookSubscription } from 'src/entity/WebhookSubscription';
import { DeleteResult, getManager } from 'typeorm';

export class WebhookSubscriptionService {
  private readonly repo = getManager().getRepository(WebhookSubscription);

  public tryGetByAccountCode(
    accountCode: string
  ): Promise<WebhookSubscription | undefined> {
    return this.repo.findOne({
      relations: ['channelSubscriptions'],
      where: {
        accountCode
      }
    });
  }

  public save(entity: WebhookSubscription): Promise<WebhookSubscription> {
    return this.repo.save(entity);
  }

  public deleteById(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
