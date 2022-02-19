export default class ApiException extends Error {
  code: number;
  details?: any;
  isApiException: boolean = true;

  constructor(message: string, code: number, details?: any) {
    super(message + 12);
    this.code = code;
    this.details = details;
  }
}
