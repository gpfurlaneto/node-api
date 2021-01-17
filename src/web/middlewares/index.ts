import path from 'path'
import glob from 'glob'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { Application } from "express"
import { Middleware } from 'Middleware'

export default (application: Application) => {
  
  application.use(morgan('short'))
  application.use(bodyParser.json());
  application.use(bodyParser.urlencoded({ extended: true }));

  const middlewarePaths = glob.sync(
    path.join(__dirname, './**/*.middleware.@(ts|js)')
  )

  middlewarePaths.forEach(middlewarePath => {
    const middleware: Middleware = require(middlewarePath).default
    middleware.apply(application)
  })
}