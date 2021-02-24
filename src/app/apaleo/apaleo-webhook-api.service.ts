import { AccountTokenService } from 'src/services/account-token.service';
import { TeamInstallationService } from 'src/services/team-installation.service';
import { ChannelSubscription } from 'src/entity/ChannelSubscription';
import { ChannelSubscriptionService } from 'src/services/channel-subscription.service';
import { ensureDefined } from 'src/utils/assertions';
import { AccountAlreadySubscribedToChannelException } from 'src/utils/exceptions';
import { WebhookSubscriptionService } from 'src/services/webhook-subscription.service';
import { WebhookSubscription } from 'src/entity/WebhookSubscription';
import { ApaleoApiServiceBase } from './apaleo-api-service-base';

export class ApaleoWebhookApiService extends ApaleoApiServiceBase {
  public async unsubscribeFromWebhooks(channelId: string): Promise<string> {
    const proxy = await this.getApiProxy();
    const accountCode = proxy.accountCode;

    const channelSubscriptionService = new ChannelSubscriptionService(
      this.teamId
    );
    const channelSubscription = await channelSubscriptionService.getByAccountCodeAndChannel(
      { accountCode, channelId }
    );
    await channelSubscriptionService.deleteById(channelSubscription.id);

    const webhookSubscriptionService = new WebhookSubscriptionService();
    const webhookSubscription = await webhookSubscriptionService.tryGetByAccountCode(
      accountCode
    );
    if (webhookSubscription?.channelSubscriptions.length === 0) {
      await webhookSubscriptionService.deleteById(webhookSubscription.id);
      await proxy.unsubscribeFromWebhooks(
        webhookSubscription.webhookSubscriptionId
      );
    }

    return accountCode;
  }

  public async subscribeForWebhooks({
    channelId,
    channelName,
    botToken
  }: {
    channelId: string;
    channelName: string;
    botToken: string;
  }): Promise<string> {
    const proxy = await this.getApiProxy();
    const accountCode = proxy.accountCode;

    const channelSubscriptionService = new ChannelSubscriptionService(
      this.teamId
    );
    const existingChannelSubscription = await channelSubscriptionService.tryGetByAccountCodeAndChannel(
      { accountCode, channelId }
    );
    if (existingChannelSubscription) {
      throw new AccountAlreadySubscribedToChannelException(accountCode);
    }

    const webhookSubscriptionService = new WebhookSubscriptionService();
    let webhookSubscription = await webhookSubscriptionService.tryGetByAccountCode(
      accountCode
    );
    if (!webhookSubscription) {
      const subscribeResult = await proxy.subscribeForWebhooks();
      const newWebhookSubscription = new WebhookSubscription().init({
        accountCode,
        webhookSubscriptionId: ensureDefined(subscribeResult.id)
      });
      webhookSubscription = await webhookSubscriptionService.save(
        newWebhookSubscription
      );
    }

    const team = await new TeamInstallationService(this.teamId).getCurrent();
    const accountToken = await new AccountTokenService(
      this.teamId
    ).getByAccountCode(accountCode);
    const channelSubscription = new ChannelSubscription().init({
      team,
      accountToken,
      webhookSubscription,
      channelId,
      channelName,
      botToken
    });
    const createdSubscription = await new ChannelSubscriptionService(
      this.teamId
    ).save(channelSubscription);

    return createdSubscription.accountToken.accountCode;
  }
}
