import { Email } from "../entities/email";

export type SubscriptonRepository = {
  subscribeBlogReader: (email: Email) => Promise<void>;
};
