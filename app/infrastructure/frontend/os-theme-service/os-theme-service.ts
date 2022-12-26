import { buildInMemoryMatchMedia } from "./in-memory-match-media";

export const buildOsThemeService = (
  matchMedia?:
    | ReturnType<typeof buildInMemoryMatchMedia>
    | ((query: string) => MediaQueryList)
) => ({});
