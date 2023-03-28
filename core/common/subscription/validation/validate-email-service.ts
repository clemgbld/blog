import {
  ERROR_MESSAGES,
  MAX_EMAIL_CHARACTERS,
} from "../subscription-constants";
import { pipeValidators } from "../../../frontend/utils/validators/pipe-validators";

const EMAIL_VALIDATION_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmailTooLong = (email: string) => email.length > MAX_EMAIL_CHARACTERS;

const validateEmailLength = (email: string) =>
  isEmailTooLong(email) ? ERROR_MESSAGES.TOO_LONG : undefined;

const validateEmailRequired = (email: string) =>
  email ? undefined : ERROR_MESSAGES.EMPTY;

const validateEmailValidity = (email: string) =>
  email.match(EMAIL_VALIDATION_REGEX) ? undefined : ERROR_MESSAGES.NOT_VALID;

export const validateEmail = pipeValidators(
  validateEmailRequired,
  validateEmailLength,
  validateEmailValidity
);
