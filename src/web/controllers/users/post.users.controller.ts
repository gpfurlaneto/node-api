import { Request, Response } from "express";
import { createUserSchema } from "./users.schemas";
import requestValidator from "../../pre-handlers/request-validator";
import UserDomain from "../../../lib/domain/UserDomain";
import authenticated from "../../pre-handlers/authenticated";

export default {
  method: 'post',
  url: '/users',
  handlers: [
    authenticated(),
    requestValidator(createUserSchema),
    async (request: Request, response: Response) => {
      const { email, username, password } = request.body
      const domain = UserDomain.instance()
      const result = await domain.create({email, username, password})
      response.send(result)
    }
  ]
}