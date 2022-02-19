import { isNil, isNaN, isDate } from 'lodash';
import BadRequest from '../../../../types/exception/BadRequest';
export default (
  object: any,
  name: string,
  required?: boolean,
  minDate?: Date,
  maxDate?: Date,
) => {
  const value: Date = object[name];
  const isNilValue = isNil(value);
  const isNaNValue = isNaN(value);

  if (required && (isNaNValue || isNilValue)) {
    throw new BadRequest(`${name}: is required`);
  }

  if (!required && (isNaNValue || isNilValue)) {
    return;
  }

  if (!isDate(value)) {
    throw new BadRequest(`${name}: is not a valid date`);
  }

  if (!isNil(minDate) && isNaN(minDate) && minDate > value) {
    throw new BadRequest(`${name}: min date is ${minDate}`);
  }

  if (!isNil(maxDate) && isNaN(maxDate) && maxDate < value) {
    throw new BadRequest(`${name}: min date is ${maxDate}`);
  }
};
