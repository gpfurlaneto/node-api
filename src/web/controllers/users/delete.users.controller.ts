import { Request, Response } from 'express';
import { getUserSchema } from './users.schemas';
import UserDomain from '../../../lib/domain/UserDomain';
import authenticated from '../../pre-handlers/authenticated';
import requestValidator from '../../pre-handlers/request-validator';

export default {
  method: 'delete',
  url: '/users/:id',
  handlers: [
    authenticated(),
    requestValidator(getUserSchema),
    async (request: Request, response: Response) => {
      const { id } = request.params;
      const domain = UserDomain.instance();
      await domain.delete(parseInt(id as string));
      response.send('ok');
    },
  ],
};
