import { Db, MongoError } from "mongodb";
import { Email } from "../../../core/backend/subscription/entities/email";
import { SubscriptonRepository } from "../../../core/backend/subscription/repositories/supscription-repository";
import { adaptDataForMongoDb } from "../db/utils/adapt-data";

import { DB_COLLECTIONS } from "../db/db-constants";
import { ERROR_MESSAGES } from "../../../core/common/subscription/subscription-constants";

export const buildMongoDbSubscriptionRepository = (
  db: Db
): SubscriptonRepository => ({
  subscribeBlogReader: async (email: Email): Promise<void> => {
    const colletction = db.collection(DB_COLLECTIONS.EMAILS);
    await colletction.createIndex({ email: 1 }, { unique: true });
    try {
      await colletction.insertOne(adaptDataForMongoDb(email));
    } catch (err) {
      if (err instanceof MongoError) {
        throw new Error(ERROR_MESSAGES.DUPLICATED);
      }
    }
  },
});
