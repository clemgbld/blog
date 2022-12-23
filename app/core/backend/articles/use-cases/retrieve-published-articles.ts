import { parseArticleContent } from "../../utils/parse-article-content";
import { ArticlesRepository } from "../repositories/articles-repository";
import { Article } from "../entities/articles";

export const retrievePublishedArticles = async (
  articlesRepository: ArticlesRepository
): Promise<Article[]> => {
  const articlesFromRepository =
    await articlesRepository.allArticlesPublished();

  return articlesFromRepository.map(parseArticleContent);
};
