import { buildInMemoryMatchMedia } from "./in-memory-match-media";

export const buildOsThemeService = (
  matchMedia?:
    | ReturnType<typeof buildInMemoryMatchMedia>
    | ((query: string) => MediaQueryList)
) => ({
  isLightMode: () => {
    if (!matchMedia) {
      return true;
    }
    return matchMedia("(prefers-color-scheme: light)").matches;
  },
});
