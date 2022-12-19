import { parseArticleContent } from "../../utils/parse-article-content";
import { ArticlesRepository } from "../repositories/articles-repository";

export const retrievePublishedArticles = async (
  articlesRepository: ArticlesRepository
) => {
  const articlesFromRepository =
    await articlesRepository.allArticlesPublished();

  return articlesFromRepository.map(parseArticleContent);
};
