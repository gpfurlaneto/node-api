import dotenv from 'dotenv'
dotenv.config()

export interface EnvValues {
  PORT: number
  NAME: string
}

export const checkEnv = () => {
  const invalids = Object.keys(Env).filter(envKey => !(Env as any)[envKey])
  if(invalids.length){
    throw Error(`Invalid environment variable(s) ${invalids.join(', ')}`)
  }
}

const Env: EnvValues = {
  NAME: process.env.NAME || '',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
}

export default Env