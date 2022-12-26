export const buildInMemoryStorage = (storage: Record<string, string> = {}) => {
  const store = storage;

  return {
    getItem: (key: string) => store[key],
  };
};
