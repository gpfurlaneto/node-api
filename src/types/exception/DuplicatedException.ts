import ApiException from "./ApiException";

export default class DuplicatedException extends ApiException {

    constructor(message = 'Duplicated'){
      super(message, 400)
    }
  }