import { parseArticleContent } from "../../utils/parse-article-content";
import { ArticlesRepository } from "../repositories/articles-repository";

type RetrievePublishedArticle = {
  articlesRepository: ArticlesRepository;
  id: string;
};

export const retrievePublishedArticle = async ({
  articlesRepository,
  id,
}: RetrievePublishedArticle) => {
  const publishedArticle = await articlesRepository.getPublishedArticle(id);

  if (!publishedArticle) {
    throw new Error(`The article with the id '${id}' does not exist`);
  }

  return parseArticleContent(publishedArticle);
};
