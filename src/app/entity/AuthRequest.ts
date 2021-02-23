import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique
} from 'typeorm';
import { TeamInstallation } from './TeamInstallation';

@Entity({ name: 'AuthRequest' })
@Unique('UQ_teamId_userId', ['team', 'userId'])
export class AuthRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TeamInstallation, { onDelete: 'CASCADE', eager: true })
  team: TeamInstallation;

  @Column({ length: 255 })
  userId: string;

  @Column({ length: 255 })
  appId: string;

  @Column({ length: 255 })
  channelId: string;

  @Column({ length: 255 })
  botToken: string;

  @Column('text', { nullable: true })
  codeVerifier?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  public init({
    team,
    userId,
    channelId,
    appId,
    botToken
  }: {
    team: TeamInstallation;
    userId: string;
    channelId: string;
    appId: string;
    botToken: string;
  }): AuthRequest {
    this.team = team;
    this.userId = userId;
    this.channelId = channelId;
    this.appId = appId;
    this.botToken = botToken;

    return this;
  }
}
