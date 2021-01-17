import BadRequest from '../../../../types/exception/BadRequest'
import booleanValidator from './boolean-validator'
import numberValidator from './number-validator'
import objectValidator from './object-validator'
import stringValidator from './string-validator'
import dateValidator from './date-validator'

interface ValueValidator {
  name: string
  required?: boolean
  validate: (value: any, path?: string) => void
}

export class ValidatorBuilder {

  values: ValueValidator[] = []

  boolean(name: string, required?: boolean) {
    this.values.push({
      name,
      required,
      validate: (object: any) => booleanValidator(object, name, required)
    } as ValueValidator)
    return this
  }

  number(name: string, required?: boolean, min?: number, max?: number) {
    this.values.push({
      name,
      required,
      validate: (object: any) => numberValidator(object, name, required, min, max)
    } as ValueValidator)
    return this
  }

  object(name: string, required?: boolean, structure?: any) {
    this.values.push({
      name,
      required,
      structure,
      validate: (object: any, path: string) => objectValidator(object, path, name, required, structure)
    } as ValueValidator)
    return this
  }

  string(name: string, required?: boolean, minLength?: number, maxLength?: number) {
    this.values.push({
      name,
      required,
      minLength,
      maxLength,
      validate: (object: any, path?: string) => stringValidator(
        object,
        name,
        path || '',
        required,
        minLength,
        maxLength
      )
    } as ValueValidator)
    return this
  }

  date(name: string, required?: boolean, minDate?: Date, maxDate?: Date) {
    this.values.push({
      name,
      required,
      minDate,
      maxDate,
      validate: (object: any) => dateValidator(
        object,
        name,
        required,
        minDate,
        maxDate
      )
    } as ValueValidator)
  }

  validate(object: any, path?: string) {
    let details: string[] = []
    this.values.forEach(value => {
      try{
        value.validate(object, path ? `${path}.${value.name}` : value.name)
      }catch(e){
        if(!e.isApiException){
          throw e
        }

        details = [
          ...details,
          ...e.details
        ]
      }
    })

    if(details.length){
      throw new BadRequest(
      details
      )
    }
  }
}

export const boolean = (name: string, required?: boolean) => (
  new ValidatorBuilder().boolean(name, required)
)

export const number = (name: string, required?: boolean, min?: number, max?: number) => (
  new ValidatorBuilder().number(name, required, min, max)
)

export const object = (name: string, required?: boolean, structure?: any) => (
  new ValidatorBuilder().object(name, required, structure)
)

export const string = (name: string, required?: boolean, minLength?: number, maxLength?: number) => (
  new ValidatorBuilder().string(name, required, minLength, maxLength)
)

export const date = (name: string, required?: boolean, minDate?: Date, maxDate?: Date) => (
  new ValidatorBuilder().date(name, required, minDate, maxDate)
)

export default {
  ValidatorBuilder,
  boolean,
  number,
  object,
  string,
  date
} 