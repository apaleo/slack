import { Connection, createConnection } from 'typeorm';

export const initDatabaseConnection = (): Promise<Connection> => {
  /* eslint-disable-next-line */
  const connectionOptions = require('./../ormconfig');

  return createConnection(connectionOptions);
};
