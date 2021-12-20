import entities from './entities'
import migrations from './migrations'
import Config from '../config/Env'

export default {
  type: 'postgres',
  url: Config.DATABASE_URL,
  logging: false,
  synchronize: false,
  entities,
  migrations,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}