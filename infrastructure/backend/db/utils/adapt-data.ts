import { WithId, Document, ObjectId } from "mongodb";

export const adaptDataForApp = <T extends { _id?: ObjectId }>(data: T) => {
  if (!data) return undefined;

  const id = data._id?.toString();
  const adaptedData = { ...data };
  delete adaptedData._id;
  return { id, ...adaptedData };
};

export const adaptDataListForApp = (dataList: WithId<Document>[]) =>
  dataList.map((data) => adaptDataForApp(data));

export const adaptIdForMongoDB = (id: string) => new ObjectId(id);
