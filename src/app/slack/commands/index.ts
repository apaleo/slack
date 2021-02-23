import { App } from '@slack/bolt';
import * as apaleoCmd from './apaleo';

export const register = (app: App) => {
  apaleoCmd.register(app);
};
