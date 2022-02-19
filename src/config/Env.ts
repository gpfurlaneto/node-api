import dotenv from 'dotenv';

if (process.env.NAME !== 'test') {
  dotenv.config();
}

export interface EnvValues {
  PORT: number;
  SECRET_JWT: string;
  DATABASE_URL: string;
  ENV_NAME: 'production' | 'test' | 'develop';
}

export const checkEnv = () => {
  const invalids = Object.keys(Env).filter((envKey) => !(Env as any)[envKey]);
  if (invalids.length) {
    throw Error(`Invalid environment variable(s) ${invalids.join(', ')}`);
  }
};

const Env: EnvValues = {
  SECRET_JWT: process.env.SECRET_JWT || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  ENV_NAME: process.env.ENV_NAME as 'production' | 'test',
};

export default Env;
