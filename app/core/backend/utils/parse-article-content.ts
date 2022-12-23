import { ArticleWithStringifyContent } from "../articles/repositories/articles-repository";
import { Article } from "../articles/entities/articles";

export const parseArticleContent = (
  article: ArticleWithStringifyContent
): Article => ({
  ...article,
  content: JSON.parse(article.content),
});
