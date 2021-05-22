// import "reflect-metadata";
import * as jest from 'jest'
import dotenv from 'dotenv'
import setupDatabase from './setupDatabase'

dotenv.config({ path: '.env.test'})

setupDatabase()
  .then(async () => {
    await jest.run(['--config', './test/jest.config.js'])
    process.exit()
  })
  .catch(error => {
    console.log(error)
  })