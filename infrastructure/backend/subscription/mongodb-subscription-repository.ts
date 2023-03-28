import { Db } from "mongodb";
import { Email } from "../../../core/backend/subscription/entities/email";
import { SubscriptonRepository } from "../../../core/backend/subscription/repositories/supscription-repository";
import { adaptDataForMongoDb } from "../articles/__tests__/mongodb-articles-repository.test";

export const buildMongoDbSubscriptionRepository = (
  db: Db
): SubscriptonRepository => ({
  subscribeBlogReader: async (email: Email) => {
    const colletction = db.collection("emails");
    await colletction.insertOne(adaptDataForMongoDb(email));
  },
});
