import { isNaN, isNil } from 'lodash';
import BadRequest from '../../../../types/exception/BadRequest';

export default (object: any, name: string, required?: boolean, min?: number, max?: number) => {
  let value = object[name];

  if (required && (isNaN(value) || isNil(value))) {
    throw new BadRequest(`${name}: is required`);
  }

  if (!required && (isNaN(value) || isNil(value))) {
    return;
  }

  if (typeof value === 'string') {
    value = parseInt(value, 10);
  }

  if (isNil(value) || isNaN(value)) {
    throw new BadRequest(`${name}: invalid number`);
  }

  if (!isNil(min) && !isNaN(min) && min > value!) {
    throw new BadRequest(`${name}: min is ${min}`);
  }

  if (!isNil(max) && !isNaN(max) && max < value!) {
    throw new BadRequest(`${name}: max is ${max}`);
  }
};
