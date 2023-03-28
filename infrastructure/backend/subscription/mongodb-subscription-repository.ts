import { Db, MongoError } from "mongodb";
import { Email } from "../../../core/backend/subscription/entities/email";
import { SubscriptonRepository } from "../../../core/backend/subscription/repositories/supscription-repository";
import { adaptDataForMongoDb } from "../articles/__tests__/mongodb-articles-repository.test";

const DUPLICATED_EMAIL_ERROR_MESSAGE = "Please try another email";

export const buildMongoDbSubscriptionRepository = (
  db: Db
): SubscriptonRepository => ({
  subscribeBlogReader: async (email: Email) => {
    const colletction = db.collection("emails");
    await colletction.createIndex({ email: 1 }, { unique: true });
    try {
      await colletction.insertOne(adaptDataForMongoDb(email));
    } catch (err) {
      if (err instanceof MongoError) {
        throw new Error(DUPLICATED_EMAIL_ERROR_MESSAGE);
      }
    }
  },
});
