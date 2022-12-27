import { buildInMemoryArticlesRepository } from "../../../../../(infrastructure)/backend/articles/in-memory-articles-repository";
import { retrievePublishedArticles } from "../retrieve-published-articles";
import { fakeArticle1, fakeArticle2 } from "../../fixtures/articles-fixtures";

describe("retrieve published articles", () => {
  it("should retrieve the expected articles", async () => {
    const articlesRepository = buildInMemoryArticlesRepository();

    expect(await retrievePublishedArticles(articlesRepository)).toEqual([
      fakeArticle1,
      fakeArticle2,
    ]);
  });
});
