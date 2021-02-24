import { TeamInstallation } from 'src/entity/TeamInstallation';
import { DeleteResult, getManager } from 'typeorm';

export class TeamInstallationService {
  private readonly repo = getManager().getRepository(TeamInstallation);

  constructor(private readonly teamId: string) {}

  public getCurrent(): Promise<TeamInstallation> {
    return this.repo.findOneOrFail({
      where: {
        id: this.teamId
      }
    });
  }

  public tryGetCurrent(): Promise<TeamInstallation | undefined> {
    return this.repo.findOne({
      where: {
        id: this.teamId
      }
    });
  }

  public save(entity: TeamInstallation): Promise<TeamInstallation> {
    return this.repo.save(entity);
  }

  public deleteCurrent(): Promise<DeleteResult> {
    return this.repo.delete(this.teamId);
  }
}
