import { Request, Response } from "express";
import { createUserSchema } from "./user.schemas";
import requestValidator from "../../pre-handlers/request-validator";
import UserDomain from "../../../lib/domain/UserDomain";

export default {
  method: 'post',
  url: '/user',
  handlers: [
    requestValidator(createUserSchema),
    async (request: Request, response: Response) => {
      const { email, username, password } = request.body
      const domain = UserDomain.instance()
      const result = await domain.create(email, username, password)
      response.send(result)
    }
  ]
}