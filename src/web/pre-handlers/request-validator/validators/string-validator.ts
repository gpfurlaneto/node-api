import { isNaN, isNil, isString } from 'lodash'
import BadRequest from "../../../../types/exception/BadRequest"

export default (
  object: any,
  name: string,
  path: string,
  required?: boolean,
  minLength?: number,
  maxLength?: number
) => {

  const value = object[name]
  const isNilValue = isNil(value)
  const isNaNValue = isNaN(value)
  if(required && (isNaNValue || isNilValue)){
    throw new BadRequest(`${path}: is required`)
  }

  if(!required && (isNaNValue || isNilValue)){
    return
  }

  if(!isString(value)){
    throw new BadRequest(`${path}: is not a valid string`)
  }

  if(minLength && minLength > value.length){
    throw new BadRequest(`${path}: min length is ${minLength}`)
  }

  if(maxLength && maxLength < value.length){
    throw new BadRequest(`${name}: max length is ${minLength}`)
  }
}