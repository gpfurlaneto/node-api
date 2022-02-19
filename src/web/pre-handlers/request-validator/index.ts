import { ValidatorBuilder } from './validators/ValidatorBuilder';

export default (validator: ValidatorBuilder) => (req: any) => {
  validator.validate(req);
};

export { default as ValidatorBuilder } from './validators/ValidatorBuilder';
