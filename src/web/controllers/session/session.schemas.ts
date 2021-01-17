import { ValidatorBuilder } from "../../pre-handlers/request-validator";

export const loginSchema = (ValidatorBuilder.object(
  'body', true,
  ValidatorBuilder
    .string('username', true)
    .string('password', true)
))