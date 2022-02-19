import entities from './entities';
import migrations from './migrations';
import Config from '../config/Env';

const extra = Config.NODE_ENV === 'test'
  ? null
  : {
    ssl: {
      rejectUnauthorized: false,
    },
  };

export default {
  type: 'postgres',
  url: Config.DATABASE_URL,
  logging: false,
  synchronize: false,
  entities,
  migrations,
  extra,
};
