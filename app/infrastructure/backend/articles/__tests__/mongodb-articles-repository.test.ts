import { MongoClient, Db, ObjectId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initMemoryDb } from "../../db/db";
import { buildMongoDbArticlesRepository } from "../mongodb-articles-repository";
import {
  fakeArticle1WithContentStringify,
  fakeArticle2WithContentStringify,
} from "../../../../core/backend/articles/fixtures/articles-fixtures";

import { ArticleWithStringifyContent } from "../../../../core/backend/articles/repositories/articles-repository";

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;
let articlesRepository: ReturnType<typeof buildMongoDbArticlesRepository>;

export const adaptIdForMongoDB = (id: string) => new ObjectId(id);

export const adaptDataForMongoDb = (
  data: Partial<ArticleWithStringifyContent>
) => {
  const id = data.id;
  const adaptedData = { ...data };
  delete adaptedData.id;
  return { _id: adaptIdForMongoDB(id || ""), ...adaptedData };
};

describe("mongodb articles repository", () => {
  beforeAll(async () => {
    const dbData = await initMemoryDb();
    db = dbData.db;
    connection = dbData.connection;
    mongoServer = dbData.mongoServer;
  });

  beforeEach(() => {
    articlesRepository = buildMongoDbArticlesRepository(db);
  });

  afterEach(async () => {
    await db.collection("articles").deleteMany({});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await connection.close();
  });

  describe("mongodb articles repository", () => {
    it("should get all the published articles", async () => {
      const hiddenFakeArticle = {
        ...fakeArticle2WithContentStringify,
        id: new ObjectId().toString(),
        hide: true,
      };

      const publishedArticle = {
        ...fakeArticle1WithContentStringify,
        id: new ObjectId().toString(),
      };

      await db
        .collection("articles")
        .insertMany([
          adaptDataForMongoDb(hiddenFakeArticle),
          adaptDataForMongoDb(publishedArticle),
        ]);

      expect(await articlesRepository.allArticlesPublished()).toEqual([
        publishedArticle,
      ]);
    });
  });
});
