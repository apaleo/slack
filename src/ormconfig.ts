import { ensureDefined, isProduction } from 'src/utils/assertions';
import { ConnectionOptions } from 'typeorm';

const importAllFunctions = (
  requireContext: __WebpackModuleApi.RequireContext
) =>
  requireContext
    .keys()
    .sort()
    .map(filename => {
      const required = requireContext(filename);
      return Object.keys(required).reduce((result, exportedKey) => {
        const exported = required[exportedKey];
        if (typeof exported === 'function') {
          return result.concat(exported);
        }
        return result;
      }, [] as any);
    })
    .flat();

const config: ConnectionOptions = {
  type: 'postgres',
  url: ensureDefined(process.env.DB_CONNECTION_STRING),
  schema: 'data',
  ssl: process.env.USE_DB_SECURE_CONNECTION === 'true',
  synchronize: false,
  migrationsRun: true,
  entities: isProduction()
    ? importAllFunctions(require.context('./app/entity/', true, /\.ts$/))
    : ['src/app/entity/*.ts'],
  migrations: isProduction()
    ? importAllFunctions(require.context('./db/migration/', true, /\.ts$/))
    : ['src/db/migration/*.ts'],
  cli: {
    migrationsDir: 'src/db/migration',
    entitiesDir: 'src/app/entity'
  }
};

export = config;
