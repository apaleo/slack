import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  OneToMany
} from 'typeorm';
import { ChannelSubscription } from './ChannelSubscription';
import { TeamInstallation } from './TeamInstallation';

@Entity({ name: 'AccountToken' })
@Unique('UQ_teamId_accountCode', ['team', 'accountCode'])
export class AccountToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamInstallation, { onDelete: 'CASCADE', eager: true })
  team: TeamInstallation;

  @Column({ length: 255 })
  accountCode: string;

  @Column({ length: 255, nullable: true })
  accountName?: string;

  @Column({ type: 'text' })
  accessToken: string;

  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ nullable: true })
  expiresAt?: number;

  @OneToMany(() => ChannelSubscription, x => x.accountToken)
  channelSubscriptions: ChannelSubscription[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  public init({
    team,
    accountCode
  }: {
    team: TeamInstallation;
    accountCode: string;
  }): AccountToken {
    this.team = team;
    this.accountCode = accountCode;

    return this;
  }
}
