import { WithId, Document, ObjectId } from "mongodb";

const adaptDefinedDataForApp = (data: any) => {
  const id = data._id.toString();
  const adaptedData = (({ _id, ...o }) => o)(data);

  return { id, ...adaptedData };
};

export const adaptDataForApp = (data: any) => {
  if (!data) return undefined;

  return adaptDefinedDataForApp(data);
};

export const adaptDataListForApp = (dataList: WithId<Document>[]) =>
  dataList.map((data) => adaptDefinedDataForApp(data));

export const adaptIdForMongoDB = (id: string) => new ObjectId(id);
