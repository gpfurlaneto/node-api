import ApiException from "./ApiException"

export default class extends ApiException {

  constructor(){
    super('Unauthorized', 401)
  }
}