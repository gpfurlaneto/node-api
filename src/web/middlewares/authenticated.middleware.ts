import { Application } from "express";
import jwt from "jsonwebtoken";
import { Middleware } from "Middleware";
import Env from "../../config/Env";

class AuthenticatedMiddleware implements Middleware{

  apply (app: Application) {
    app.use((req: any, _res, next) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, Env.SECRET_JWT)
        req.user = user
      } 

      next()
    })
  }
}

export default new AuthenticatedMiddleware()
// export default async function(context: ParameterizedContext<any, IRouterParamContext<any, {}>>, next: () => Promise<any>) {
//     const user = context.state.user as JwtTokenPayload
  
//     if (!user) {
//       throw Boom.unauthorized('unauthorized')
//     }
  
//     const sessionContext = new SessionContext()
//     const dbUser = await sessionContext.fetchActiveUser(user.sub)
  
//     if (!dbUser) {
//       throw Boom.unauthorized('unauthorized')
//     }
  
//     context.state.user = dbUser
  
//     return next()
//   }