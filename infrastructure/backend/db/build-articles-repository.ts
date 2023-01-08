import initDb from "./mongodb";
import { buildInMemoryArticlesRepository } from "../articles/in-memory-articles-repository";
import { buildMongoDbArticlesRepository } from "../articles/mongodb-articles-repository";

export const buildArticlesRepository = async () => {
  if (process.env.NEXT_APP_ARG === "in-memory") {
    return buildInMemoryArticlesRepository();
  }
  const clientPromise = initDb();
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return buildMongoDbArticlesRepository(db);
};
