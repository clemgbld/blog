import { retrievePublishedArticle } from "../../../core/backend/articles/use-cases/retrieve-published-article";
import { buildInMemoryArticlesRepository } from "../../../infrastructure/backend/articles/in-memory-articles-repository";
import Article from "../../../components/Article/Article";

import React from "react";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const articlesRepository = buildInMemoryArticlesRepository();

  const article = await retrievePublishedArticle({ articlesRepository, id });

  return <Article article={article} />;
};

export default ArticlePage;
