import ApiException from './ApiException';

export default class NotFoundException extends ApiException {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}
