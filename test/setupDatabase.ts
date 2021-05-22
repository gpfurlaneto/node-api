import type { Config } from '@jest/types';
import { createConnection } from 'typeorm';
import databaseConfig from '../src/database/ormconfig'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default async () => {
  const connection = await createConnection({
    ...databaseConfig,
    url: process.env.DATABASE_URL,
  } as PostgresConnectionOptions)
  const migrations = await connection.runMigrations()

  console.info(`Executed Migrations: ${migrations.length ? 
    migrations.map(migration =>  '[\n  ' + migration.name) + '\n]'
    : 'No migrations to run.'}`)
    
  return connection
};