import { Request, Response } from 'express';
import authenticated from '../../pre-handlers/authenticated';

export default {
  method: 'get',
  url: '/session/user',
  handlers: [
    authenticated(),
    async (request: Request, response: Response) => {
      response.send((request as any).user);
    },
  ],
};
