import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm';

@Entity({ name: 'TeamInstallation' })
export class TeamInstallation {
  @PrimaryColumn({ length: 255 })
  id: string;

  @Column('text')
  installationJson: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  public init({ id, json }: { id: string; json: string }): TeamInstallation {
    this.id = id;
    this.installationJson = json;

    return this;
  }
}
