export const buildInMemoryStorage = (storage: Record<string, string> = {}) => {
  const store = storage;

  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
};
