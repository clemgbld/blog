import { buildInMemoryArticlesRepository } from "../../../../infrastructure/backend/articles/in-memory-articles-repository";
import { parseArticleContent } from "../../utils/parse-article-content";

export const retrievePublishedArticles = async (
  articlesRepository: ReturnType<typeof buildInMemoryArticlesRepository>
) => {
  const articlesFromRepository =
    await articlesRepository.allArticlesPublished();

  return articlesFromRepository.map(parseArticleContent);
};
