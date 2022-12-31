import { retrievePublishedArticle } from "../../../core/backend/articles/use-cases/retrieve-published-article";
import { buildInMemoryArticlesRepository } from "../../../infrastructure/backend/articles/in-memory-articles-repository";
import ArticleContent from "../../../components/ArticleContent/ArticleContent";
import ArticleDetails from "../../../components/ArticleDetails/ArticleDetails";

import React from "react";
import ArticleTableOfContent from "../../../components/ArticleTableOfContent/ArticleTableOfContent";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const articlesRepository = buildInMemoryArticlesRepository();

  const { content, date, topic, timeToRead } = await retrievePublishedArticle({
    articlesRepository,
    id,
  });

  return (
    <div className="page">
      <ArticleDetails date={date} topic={topic} timeToRead={timeToRead} />
      <ArticleTableOfContent content={content} />
      <ArticleContent content={content} />
    </div>
  );
};

export default ArticlePage;
