"use client";
import { FC } from "react";
import { useSelector } from "react-redux";
import { pipe } from "ramda";
import { RootState } from "../../(core)/frontend/store";
import { Article } from "../../(core)/backend/articles/entities/articles";
import ArticleCard from "./ArticleCard/ArticleCard";
import { allArticlesFormatted } from "../../(core)/frontend/articles/formatting/format-articles";
import { searchSelector } from "../../(core)/frontend/articles/search/select-searched-article";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  const searchTerms = useSelector(
    ({ ui: { searchTerms } }: RootState) => searchTerms
  );

  const handleArticles = pipe(
    searchSelector(searchTerms),
    allArticlesFormatted
  );

  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles yet!</p>
      ) : (
        handleArticles(articles).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
};

export default Home;
