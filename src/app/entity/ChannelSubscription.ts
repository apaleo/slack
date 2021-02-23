import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { AccountToken } from './AccountToken';
import { TeamInstallation } from './TeamInstallation';
import { WebhookSubscription } from './WebhookSubscription';

@Entity({ name: 'ChannelSubscription' })
@Unique('UQ_accountTokenId_channelId', ['accountToken', 'channelId'])
export class ChannelSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamInstallation, { onDelete: 'CASCADE', eager: true })
  team: TeamInstallation;

  @ManyToOne(() => AccountToken, x => x.channelSubscriptions, {
    onDelete: 'CASCADE',
    eager: true
  })
  accountToken: AccountToken;

  @ManyToOne(() => WebhookSubscription, { onDelete: 'NO ACTION', eager: true })
  webhookSubscription: WebhookSubscription;

  @Column({ length: 255 })
  channelId: string;

  @Column({ length: 255 })
  channelName: string;

  @Column({ length: 255 })
  botToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  public init({
    team,
    accountToken,
    webhookSubscription,
    channelId,
    channelName,
    botToken
  }: {
    team: TeamInstallation;
    accountToken: AccountToken;
    webhookSubscription: WebhookSubscription;
    channelId: string;
    channelName: string;
    botToken: string;
  }): ChannelSubscription {
    this.team = team;
    this.accountToken = accountToken;
    this.webhookSubscription = webhookSubscription;
    this.channelId = channelId;
    this.channelName = channelName;
    this.botToken = botToken;

    return this;
  }
}
