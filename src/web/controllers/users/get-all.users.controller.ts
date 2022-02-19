import { Request, Response } from 'express';
import UserDomain from '../../../lib/domain/UserDomain';
import authenticated from '../../pre-handlers/authenticated';

export default {
  method: 'get',
  url: '/users',
  handlers: [
    authenticated(),
    async (_request: Request, response: Response) => {
      const domain = UserDomain.instance();
      const users = await domain.getAllUsers();
      response.send(users);
    },
  ],
};
