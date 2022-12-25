"use client";
import { FC } from "react";
import { Article } from "../../core/backend/articles/entities/articles";
import ArticleCard from "./ArticleCard/ArticleCard";
import { allArticlesFormatted } from "../../core/frontend/articles/formatting/format-articles";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles yet!</p>
      ) : (
        allArticlesFormatted(articles).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
};

export default Home;
