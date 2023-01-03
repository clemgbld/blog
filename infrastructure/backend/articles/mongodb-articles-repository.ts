import { Db, ObjectId } from "mongodb";
import { adaptDataForApp, adaptDataListForApp } from "../db/utils/adapt-data";
import { ArticleWithStringifyContent } from "../../../core/backend/articles/repositories/articles-repository";

export const buildMongoDbArticlesRepository = (db: Db) => ({
  allArticlesPublished: async (): Promise<ArticleWithStringifyContent[]> => {
    const articlesFromDb = await db
      .collection("articles")
      .find({ hide: false })
      .toArray();

    return adaptDataListForApp(articlesFromDb);
  },

  getPublishedArticle: async (
    id: string
  ): Promise<ArticleWithStringifyContent | undefined> =>
    adaptDataForApp(
      await db.collection("articles").findOne({ _id: new ObjectId(id) })
    ),
});
