import path from 'path'
import glob from 'glob'
import { Application } from "express"
import { IRoute } from '../types/IRoute'

export default (application: Application) => {
  const controllerPaths = glob.sync(
    path.join(__dirname, './controllers/**/*.controller.@(ts|js)')
  )

  controllerPaths.forEach(controllerPath => {
    const controller: IRoute = require(controllerPath).default
    application[controller.method](`/api${controller.url}`, controller.handler)
  })
}