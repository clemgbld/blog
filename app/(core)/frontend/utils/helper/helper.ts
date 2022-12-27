import { compose } from "ramda";

export const removeDuplicate = (array: any[]) => [...new Set(array)];

export const removeUndefined = (arr: any[]) => arr.filter((el) => el);

export const removeUndefinedAndDuplicate = compose(
  removeDuplicate,
  removeUndefined
);
