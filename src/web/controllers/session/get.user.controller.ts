import { request, Request, Response } from "express";
import UserDomain from "../../../lib/domain/UserDomain";
import authenticated from "../../pre-handlers/authenticated";
import requestValidator from "../../pre-handlers/request-validator";

export default {
  method: 'get',
  url: '/session/user',
  handlers: [
    authenticated(),
    async (request: Request, response: Response) => {
      response.send((request as any).user)
    }
  ]
}