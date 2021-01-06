import { Application } from "express";

export interface IMiddleware {
  apply: (app: Application) => void
}