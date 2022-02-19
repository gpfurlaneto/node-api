// import "reflect-metadata";
import * as jest from 'jest'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })

import setupDatabase from './setupDatabase'

setupDatabase()
  .then(async () => {
    await jest.run(['--config', './test/jest.config.js'])
    process.exit()
  })
  .catch(error => {
    console.log(error)
  })