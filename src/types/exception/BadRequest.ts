import ApiException from './ApiException';

export default class BadRequestException extends ApiException {
  constructor(details?: string | string[]) {
    super('Bad request', 400, details instanceof Array ? details : [details]);
  }
}
