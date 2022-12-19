import {
  fakeArticle1WithContentStringify,
  fakeArticle2WithContentStringify,
} from "../../../core/backend/articles/fixtures/articles-fixtures";
import { ArticleWithStringifyContent } from "../../../core/backend/articles/repositories/articles-repository";

export const buildInMemoryArticlesRepository = () => {
  const db = new Map<string, ArticleWithStringifyContent>();
  db.set(fakeArticle1WithContentStringify.id, fakeArticle1WithContentStringify);
  db.set(fakeArticle2WithContentStringify.id, fakeArticle2WithContentStringify);

  return {
    allArticlesPublished: async () => Promise.resolve([...db.values()]),
  };
};
