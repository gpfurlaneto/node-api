import entities from './entities';
import migrations from './migrations';
import Env from '../config/Env';

const extra =
  Env.NODE_ENV === 'test'
    ? null
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      };

export default {
  type: 'postgres',
  url: Env.DATABASE_URL,
  logging: false,
  synchronize: false,
  entities,
  migrations,
  extra,
};
