import { App } from '@slack/bolt';
import * as configureButtonAction from './actions/configure-button.action';
import * as selectAccountReservationsAction from './actions/select-account-reservations.action';
import * as selectAccountSubscribeAction from './actions/select-account-subscribe.action';
import * as selectAccountUnsubscribeAction from './actions/select-account-unsubscribe.action';
import * as disconnectAccountAction from './actions/disconnect-account.action';

export const register = (app: App) => {
  configureButtonAction.register(app);
  selectAccountReservationsAction.register(app);
  selectAccountSubscribeAction.register(app);
  selectAccountUnsubscribeAction.register(app);
  disconnectAccountAction.register(app);
};
