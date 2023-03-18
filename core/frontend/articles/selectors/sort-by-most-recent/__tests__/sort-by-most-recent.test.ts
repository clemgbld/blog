import { articleBuilder } from "../../../utils/article-builder";
import { sortByMostRecent } from "../sort-by-most-recent";

describe("sort by most recent", () => {
  it("should sort articles by the most recent ones", () => {
    expect(
      sortByMostRecent([
        articleBuilder({ date: 1 }),
        articleBuilder({ date: 2 }),
        ,
      ])
    ).toEqual([articleBuilder({ date: 2 }), articleBuilder({ date: 1 })]);
  });
});
