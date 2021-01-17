import { ValidatorBuilder } from "./validators/ValidatorBuilder"

export default (validator: ValidatorBuilder) => {

  return (req: any) => {
    validator.validate(req)
  }
} 

export { default as ValidatorBuilder } from './validators/ValidatorBuilder'