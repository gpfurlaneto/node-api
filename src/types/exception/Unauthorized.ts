import ApiException from "./ApiExceptions";

export default class extends ApiException {

  constructor(){
    super('Unauthorized', 401)
  }
}