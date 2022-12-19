import { buildInMemoryArticlesRepository } from "../../../../../infrastructure/backend/articles/in-memory-articles-repository";
import { retrievePublishedArticle } from "../retrieve-published-article";
import { fakeArticle1 } from "../../fixtures/articles-fixtures";

const EXISTING_ARTICLE_ID = "1";

const UNEXSTING_ARTICLE_ID = "5";

describe("retrieve published article", () => {
  it("should retrieve the expected article based on its id", async () => {
    const articlesRepository = buildInMemoryArticlesRepository();

    const expectedArticle = await retrievePublishedArticle({
      articlesRepository,
      id: EXISTING_ARTICLE_ID,
    });

    expect(expectedArticle).toEqual(fakeArticle1);
  });

  it("should fails fast when the article does not exist or is hidden", async () => {
    const articlesRepository = buildInMemoryArticlesRepository();

    await expect(async () =>
      retrievePublishedArticle({
        articlesRepository,
        id: UNEXSTING_ARTICLE_ID,
      })
    ).rejects.toThrowError("The article with the id '5' does not exist");
  });
});
