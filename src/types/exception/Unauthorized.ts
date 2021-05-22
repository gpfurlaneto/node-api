import ApiException from "./ApiException"

export default class UnauthorizedException extends ApiException {

  constructor(){
    super('Unauthorized', 401)
  }
}