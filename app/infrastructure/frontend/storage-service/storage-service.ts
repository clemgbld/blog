import { buildInMemoryStorage } from "./in-memory-storage";

export const buildStorageService = (
  storage: Storage | ReturnType<typeof buildInMemoryStorage>
) => ({
  getItem: (key: string) => storage.getItem(key),
});