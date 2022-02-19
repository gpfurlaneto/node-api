import { Application } from 'express';
import jwt from 'jsonwebtoken';
import { Middleware } from 'Middleware';
import Env from '../../config/Env';

class AuthenticatedMiddleware implements Middleware {
  apply(app: Application) {
    app.use((req: any, _res, next) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, Env.SECRET_JWT);
        req.user = user;
      }

      next();
    });
  }
}

export default new AuthenticatedMiddleware();
