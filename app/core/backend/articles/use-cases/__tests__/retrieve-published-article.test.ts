import { buildInMemoryArticlesRepository } from "../../../../../infrastructure/backend/articles/in-memory-articles-repository";
import { retrievePublishedArticle } from "../retrieve-published-article";
import { fakeArticle1 } from "../../fixtures/articles-fixtures";

describe("retrieve published article", () => {
  it("should retrieve the expected article based on its id", async () => {
    const articlesRepository = buildInMemoryArticlesRepository();

    const expectedArticle = await retrievePublishedArticle({
      articlesRepository,
      id: "1",
    });

    expect(expectedArticle).toEqual(fakeArticle1);
  });
});
