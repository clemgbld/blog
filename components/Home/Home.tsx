"use client";
import { FC, useMemo } from "react";
import { pipe } from "ramda";

import { Article } from "../../core/backend/articles/entities/articles";
import ArticleCard from "./ArticleCard/ArticleCard";
import { allArticlesFormatted } from "../../core/frontend/articles/formatting/format-articles";
import { searchSelector } from "../../core/frontend/articles/search/select-searched-article";
import classNames from "./Home.module.scss";
import { useSearchStore } from "../../hooks/useSearchStore";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  const searchTerms = useSearchStore((state) => state.searchTerms);

  const handleArticles = pipe(
    searchSelector(searchTerms),
    allArticlesFormatted
  );

  const filteredArticles = useMemo(
    () => handleArticles(articles),
    [articles, handleArticles]
  );

  return (
    <div className={classNames.home}>
      <h1>Blog Posts:</h1>
      {filteredArticles.length === 0 ? (
        <p>No articles!</p>
      ) : (
        filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
};

export default Home;
