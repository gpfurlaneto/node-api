import { isNaN, isNil } from "lodash"
import BadRequest from "../../../../types/exception/BadRequest"

export default (object: any, name: string, required?: boolean, min?: number, max?: number) => {

  const value = object[name]

  if(required && isNaN(value)){
    throw new BadRequest(`${name}: is required`)
  }

  if(!required && isNaN(value)){
    return
  }

  if((!isNil(min) && isNaN(min)) && min > value){
    throw new BadRequest(`${name}: min date is ${min}`)
  }

  if((!isNil(max) && isNaN(max)) && max < value){
    throw new BadRequest(`${name}: min date is ${max}`)
  }
}