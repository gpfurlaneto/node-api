import { Request, Response } from "express";
import { loginSchema } from "./session.schemas";
import requestValidator from "../../pre-handlers/request-validator";

export default {
  method: 'post',
  url: '/session/login',
  handlers: [
    requestValidator(loginSchema),
    async (request: Request, response: Response) => {
      const { username, password } = request.body
      response.send('Login is in development.')
    }
  ]
}