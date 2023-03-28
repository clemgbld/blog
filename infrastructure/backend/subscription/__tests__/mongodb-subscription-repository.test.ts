/**
 * @jest-environment node
 */
import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { initMemoryDb } from "../../db/db";
import { buildMongoDbSubscriptionRepository } from "../mongodb-subscription-repository";
import { generateId } from "../../id-generator/generate-id";
import { adaptIdForMongoDB } from "../../db/utils/adapt-data";

let db: Db;
let connection: MongoClient;
let mongoServer: MongoMemoryServer;
let subscriptionRepository: ReturnType<
  typeof buildMongoDbSubscriptionRepository
>;

beforeAll(async () => {
  const dbData = await initMemoryDb();
  db = dbData.db;
  connection = dbData.connection;
  mongoServer = dbData.mongoServer;
});

beforeEach(() => {
  subscriptionRepository = buildMongoDbSubscriptionRepository(db);
});

afterEach(async () => {
  await db.collection("emails").deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await connection.close();
});

describe("mongodb subscription repository", () => {
  it("should sucessfully insert an email into the db", async () => {
    const id = generateId();
    const email = "exemple@hotmail.fr";
    await subscriptionRepository.subscribeBlogReader({ email, id });
    expect(await db.collection("emails").findOne({ email })).toEqual({
      _id: adaptIdForMongoDB(id),
      email,
    });
  });
});
