import dotenv from 'dotenv';

if (process.env.NAME !== 'test') {
  dotenv.config();
}

export interface EnvValues {
  PORT: number;
  SECRET_JWT: string;
  DATABASE_URL: string;
  NODE_ENV: 'production' | 'test';
}

const Env: EnvValues = {
  SECRET_JWT: process.env.SECRET_JWT || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  NODE_ENV: process.env.NODE_ENV as 'production' | 'test',
};

export const checkEnv = () => {
  const invalids = Object.keys(Env).filter((envKey) => !(Env as any)[envKey]);
  if (invalids.length) {
    throw Error(`Invalid environment variable(s) ${invalids.join(', ')}`);
  }
};

export default Env;
