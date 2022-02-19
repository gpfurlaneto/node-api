import entities from './entities';
import migrations from './migrations';
import Env from '../config/Env';

const extra =
  Env.ENV_NAME === 'production'
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : null;

export default {
  type: 'postgres',
  url: Env.DATABASE_URL,
  logging: false,
  synchronize: false,
  entities,
  migrations,
  extra,
};
