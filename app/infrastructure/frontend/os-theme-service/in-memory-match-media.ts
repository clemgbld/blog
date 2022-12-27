export const buildInMemoryMatchMedia =
  (isLightMode = true) =>
  (colorScheme: string) => {
    return {
      matches: isLightMode,
    };
  };
