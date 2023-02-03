import { pipe } from "ramda";

export const removeDuplicate = <T>(array: T[]) => [...new Set(array)];

export const removeUndefined = <T>(arr: T[]) => arr.filter((el) => el);

export const removeUndefinedAndDuplicate = pipe(
  removeUndefined,
  removeDuplicate
);
