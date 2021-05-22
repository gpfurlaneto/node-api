import { ValidatorBuilder } from "../../pre-handlers/request-validator";

export const createUserSchema = (ValidatorBuilder.object(
  'body', true,
  ValidatorBuilder
    .string('email', true)
    .string('username', true)
    .string('password', true)
))

export const updateUserSchema = (
  ValidatorBuilder
    .object(
      'params', true,
      ValidatorBuilder
        .number('id', true, 100, 101)
    )
    .object(
      'body', true,
      ValidatorBuilder
        .string('email', false)
        .string('username', false)
        .string('password', false)
    )
)

export const getUserSchema = (ValidatorBuilder.object(
  'params', true,
  ValidatorBuilder
    .number('id', true)
))
