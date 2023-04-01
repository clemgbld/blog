import clientPromise from "./mongodb";
import { buildMongoDbSubscriptionRepository } from "../subscription/mongodb-subscription-repository";
import { buildInMemorySubscriptionRepository } from "../subscription/in-memory-subscription-repository";

export const buildSubscriptionRepository = async () => {
  if (process.env.NEXT_APP_ARG === "in-memory") {
    return buildInMemorySubscriptionRepository({});
  }
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return buildMongoDbSubscriptionRepository(db);
};
