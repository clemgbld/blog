import { retrievePublishedArticle } from "../../../core/backend/articles/use-cases/retrieve-published-article";
import { buildArticlesRepository } from "../../../infrastructure/backend/db/build-articles-repository";
import ArticleContent from "../../../components/ArticleContent/ArticleContent";
import ArticleDetails from "../../../components/ArticleDetails/ArticleDetails";

import React from "react";
import ArticleTableOfContent from "../../../components/ArticleTableOfContent/ArticleTableOfContent";
import Comments from "../../../components/Comments/Comments";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const articlesRepository = await buildArticlesRepository();

  const article = await retrievePublishedArticle({
    articlesRepository,
    id,
  });

  return (
    <div className="page">
      <ArticleDetails
        date={article.date}
        topic={article.topic}
        timeToRead={article.timeToRead}
      />
      <ArticleTableOfContent article={article} />
      <ArticleContent content={article.content} />
      <Comments />
    </div>
  );
};

export default ArticlePage;
