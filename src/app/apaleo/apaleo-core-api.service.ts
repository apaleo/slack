import { ReservationListModel, ReservationModel } from 'clients/booking/models';
import { AccountModel } from 'clients/account';
import { ApaleoApiServiceBase } from './apaleo-api-service-base';

const defaultPageSize = 10;

export class ApaleoCoreApiService extends ApaleoApiServiceBase {
  public async getReservations(
    textSearch: string
  ): Promise<ReservationListModel> {
    const proxy = await this.getApiProxy();

    return proxy.getReservations(textSearch, 1, defaultPageSize);
  }

  public async getReservationById(id: string): Promise<ReservationModel> {
    const proxy = await this.getApiProxy();

    return proxy.getReservationById(id);
  }

  public async getCurrentAccount(): Promise<AccountModel | undefined> {
    const proxy = await this.getApiProxy();

    return proxy.getCurrentAccount();
  }
}
