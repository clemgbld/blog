import { buildInMemoryArticlesRepository } from "../../../../infrastructure/backend/articles/in-memory-articles-repository";
import { parseArticleContent } from "../../utils/parse-article-content";

type RetrievePublishedArticle = {
  articlesRepository: ReturnType<typeof buildInMemoryArticlesRepository>;
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
