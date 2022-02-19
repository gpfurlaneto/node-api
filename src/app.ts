import 'dotenv/config';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import routesConfig from './web/routes';
import Env, { checkEnv } from './config/Env';
import middlewaresConfig from './web/middlewares';
import databaseConfig from './database/ormconfig';

const start = async () => {
  try {
    checkEnv();

    const application: Application = express();

    const connection = await createConnection(databaseConfig as PostgresConnectionOptions);
    const migrations = await connection.runMigrations();

    console.info(
      `Executed Migrations: ${migrations.length ? `${migrations.map((migration) => `[\n  ${migration.name}`)}\n]` : 'No migrations to run.'
      }`,
    );

    // Middlewares
    middlewaresConfig(application);

    // routes
    routesConfig(application);

    const { PORT } = Env;

    application.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}`);
    });
  } catch (error: any) {
    console.error(error);
    process.exit();
  }
};

start();
