import { isNil, isNaN } from "lodash"
import BadRequest from "../../../../types/exception/BadRequest"

export default (object: any, name: string, required?: boolean) => {
  const value = object[name]
  if(required && (isNil(value) || isNaN(value))){
    throw new BadRequest(`${name}: is required`)
  }
}