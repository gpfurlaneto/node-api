import { ValidatorBuilder } from "../../pre-handlers/request-validator";

export const createUserSchema = (ValidatorBuilder.object(
  'body', true,
  ValidatorBuilder
    .string('email', true)
    .string('username', true)
    .string('password', true)
))