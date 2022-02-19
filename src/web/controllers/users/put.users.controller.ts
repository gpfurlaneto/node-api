import { Request, Response } from 'express';
import { updateUserSchema } from './users.schemas';
import requestValidator from '../../pre-handlers/request-validator';
import UserDomain from '../../../lib/domain/UserDomain';
import authenticated from '../../pre-handlers/authenticated';

export default {
  method: 'put',
  url: '/users/:id',
  handlers: [
    authenticated(),
    requestValidator(updateUserSchema),
    async (request: Request, response: Response) => {
      const { id } = request.params;
      const { email, username, password } = request.body;
      const domain = UserDomain.instance();
      const user = await domain.update(parseInt(id, 10), {
        email,
        username,
        password,
      });
      response.send(user);
    },
  ],
};
