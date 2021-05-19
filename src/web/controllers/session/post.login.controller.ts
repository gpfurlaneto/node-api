import { Request, Response } from "express";
import { loginSchema } from "./session.schemas";
import requestValidator from "../../pre-handlers/request-validator";
import UserDomain from "../../../lib/domain/UserDomain";

export default {
  method: 'post',
  url: '/session/login',
  handlers: [
    requestValidator(loginSchema),
    async (request: Request, response: Response) => {
      const { username, password } = request.body
      const domain = UserDomain.instance()
      const result = await domain.login(username, password)
      response.send(result)
    }
  ]
}