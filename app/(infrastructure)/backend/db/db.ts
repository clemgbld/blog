import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

export const initMemoryDb = async () => {
  const mongoServer = await MongoMemoryServer.create();

  const connection = await MongoClient.connect(mongoServer.getUri(), {});

  const db = connection.db("admin");

  return { db, connection, mongoServer };
};
