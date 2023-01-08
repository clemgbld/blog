import { cache } from "react";
import { retrievePublishedArticle } from "../../../core/backend/articles/use-cases/retrieve-published-article";
import { buildArticlesRepository } from "../../../infrastructure/backend/db/build-articles-repository";

export const revalidate = 1000;

export const getArticle = cache(async (id: string) => {
  const articlesRepository = await buildArticlesRepository();
  return retrievePublishedArticle({
    articlesRepository,
    id,
  });
});
