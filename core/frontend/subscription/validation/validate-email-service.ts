import {
  ERROR_MESSAGES,
  MAX_EMAIL_CHARACTERS,
} from "../subscription-constants";

const isEmailTooLong = (email: string) => email.length > MAX_EMAIL_CHARACTERS;

export const validateEmail = (email: string) => {
  if (!email) return ERROR_MESSAGES.EMPTY;
  if (isEmailTooLong(email)) return ERROR_MESSAGES.TOO_LONG;
  return undefined;
};
