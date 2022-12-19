import { Db } from "mongodb";

export const buildMongoDbArticlesRepository = (db: Db) => ({
  allArticlesPublished: async () => null,
});
