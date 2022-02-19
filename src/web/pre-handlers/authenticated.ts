import UnauthorizedException from '../../types/exception/Unauthorized';

export default () => (req: any) => {
  if (!req.user) {
    throw new UnauthorizedException();
  }
};
