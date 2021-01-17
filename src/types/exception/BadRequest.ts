import ApiException from "./ApiExceptions";

export default class extends ApiException {

  constructor(details?: string | string[]){
    super('Bad request', 400, details instanceof Array ? details : [details])
  }
} 