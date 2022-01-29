import path from 'path'
import glob from 'glob'
import { Application, Request, Response, NextFunction } from "express"
import { Route } from '../types/Route'

export default (application: Application) => {
  const controllerPaths = glob.sync(
    path.join(__dirname, './controllers/**/*.controller.@(ts|js)')
  )

  controllerPaths.forEach(controllerPath => {
    const controller: Route = require(controllerPath).default
    application[controller.method](`/api${controller.url}`,
      controller.handlers.map(handler => async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handler(req, res)
          next()
        } catch (err: any) {
          if (err.isApiException) {
            return res.status(err.code).send({
              code: err.code,
              message: err.message,
              details: err.details,
              isApiException: err.isApiException
            });
          }

          throw err
        }
      })
    )
  })
}