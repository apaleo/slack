import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { ChannelSubscription } from './ChannelSubscription';

@Entity({ name: 'WebhookSubscription' })
@Unique('UQ_accountCode', ['accountCode'])
export class WebhookSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  accountCode: string;

  @Column({ length: 255 })
  webhookSubscriptionId: string;

  @OneToMany(() => ChannelSubscription, x => x.webhookSubscription)
  channelSubscriptions: ChannelSubscription[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  public init({
    accountCode,
    webhookSubscriptionId
  }: {
    accountCode: string;
    webhookSubscriptionId: string;
  }): WebhookSubscription {
    this.accountCode = accountCode;
    this.webhookSubscriptionId = webhookSubscriptionId;

    return this;
  }
}
