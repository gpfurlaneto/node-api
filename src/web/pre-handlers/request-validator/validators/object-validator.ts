import { isNil, isNaN, difference } from "lodash"
import { ValidatorBuilder } from "./ValidatorBuilder"
import BadRequest from "../../../../types/exception/BadRequest"

export default (object: any, path: string, name: string, required?: boolean, structure?: ValidatorBuilder) => {
  const value = object[name]
  const isNilValue = isNil(value)
  const isNaNValue = isNaN(value)

  if(required && (isNaNValue || isNilValue)){
    throw new BadRequest(`${path}: is required`)
  }

  if(!required && (isNaNValue || isNilValue)){
    return
  }

  if(structure){
    
    let validationException = null
    
    try{
      structure.validate(value, `${path}`)
    }catch(e){
      validationException = e
    }
    
    const currentFields = Object.keys(value)
    const allowedFields = structure.values.map(value => value.name)
    const differences = difference(currentFields, allowedFields)
    
    if(differences.length && validationException){
      throw new BadRequest([
        ...validationException.details,
        `${path}: Fields not allowed [${differences}]`    
      ])
    }

    if(differences.length){
      throw new BadRequest(`${path}: Fields not allowed [${differences}]`)
    }

    if(validationException){
      throw validationException
    }
    
  }

}