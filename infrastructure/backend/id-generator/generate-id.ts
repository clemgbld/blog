import { ObjectId } from "mongodb";

export const generateId = (): string => new ObjectId().toString();
