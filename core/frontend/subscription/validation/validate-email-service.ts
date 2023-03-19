import {
  ERROR_MESSAGES,
  MAX_EMAIL_CHARACTERS,
} from "../subscription-constants";

const isEmailTooLong = (email: string) => email.length > MAX_EMAIL_CHARACTERS;

export const validateEmail = (email: string) => {
  if (!email) return ERROR_MESSAGES.EMPTY;
  if (isEmailTooLong(email)) return ERROR_MESSAGES.TOO_LONG;
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    return "Email adress should be a valid address email";
  return undefined;
};
