// import "reflect-metadata";
import * as jest from 'jest'
import dotenv from 'dotenv'
import setupDatabase from './lib/setupDatabase'

dotenv.config({ path: '.env.test'})

setupDatabase()
  .then(async () => {
    await jest.run()
    process.exit()
  })
  .catch(error => {
    console.log(error)
  })