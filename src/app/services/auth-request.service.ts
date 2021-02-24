import { AuthRequest } from 'src/entity/AuthRequest';
import { AuthRequestNotFoundException } from 'src/utils/exceptions';
import { DeleteResult, getManager } from 'typeorm';

export class AuthRequestService {
  private readonly repo = getManager().getRepository(AuthRequest);

  public async getById(id: string): Promise<AuthRequest> {
    try {
      return await this.repo.findOneOrFail(id);
    } catch {
      throw new AuthRequestNotFoundException();
    }
  }

  public tryGetByUser(
    teamId: string,
    userId: string
  ): Promise<AuthRequest | undefined> {
    return this.repo.findOne({
      where: {
        team: { id: teamId },
        userId
      }
    });
  }

  public save(entity: AuthRequest): Promise<AuthRequest> {
    return this.repo.save(entity);
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
