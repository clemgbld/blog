import { Db } from "mongodb";
import { Email } from "../../../core/backend/subscription/entities/email";
import { SubscriptonRepository } from "../../../core/backend/subscription/repositories/supscription-repository";

export const buildMongoDbSubscriptionRepository = (
  db: Db
): SubscriptonRepository => ({
  subscribeBlogReader: async (email: Email) => {},
});
