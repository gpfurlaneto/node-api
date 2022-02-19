import UnauthorizedException from '../../types/exception/Unauthorized';

export default () => {
  return (req: any) => {
    if (!req.user) {
      throw new UnauthorizedException();
    }
  };
};
