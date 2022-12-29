"use client";
import { FC, useState, useMemo } from "react";
import { pipe } from "ramda";

import { Article } from "../../core/backend/articles/entities/articles";
import ArticleCard from "./ArticleCard/ArticleCard";
import Tag from "./Tag/Tag";
import { allArticlesFormatted } from "../../core/frontend/articles/formatting/format-articles";
import { searchSelector } from "../../core/frontend/articles/search/select-searched-article";
import { useSearchStore } from "../../hooks/useSearchStore";
import {
  allTopics,
  countArticlesInTopic,
  selectArticlesBasedOnTopic,
  handleSelectedTopics,
  ALL_ARTICLES,
} from "../../core/frontend/articles/topics/topics";
import classNames from "./Home.module.scss";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  const [currentTopics, setCurrentTopics] = useState<string[]>([ALL_ARTICLES]);
  const searchTerms = useSearchStore((state) => state.searchTerms);

  const handleArticles = useMemo(
    () =>
      pipe(
        searchSelector(searchTerms),
        selectArticlesBasedOnTopic(currentTopics),
        allArticlesFormatted
      ),
    [searchTerms, currentTopics]
  );

  const filteredArticles = useMemo(
    () => handleArticles(articles),
    [articles, handleArticles]
  );

  return (
    <div className="page">
      <h1 className={classNames.title}>Blog Posts:</h1>
      {filteredArticles.length === 0 ? (
        <p>No articles!</p>
      ) : (
        filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
      <h2 className={classNames.title}>Topics:</h2>
      <div>
        {allTopics(articles).map((topic) => (
          <Tag
            className=""
            key={topic}
            onClick={() => setCurrentTopics(handleSelectedTopics(topic))}
            label={`${topic} (${countArticlesInTopic(topic, articles)})`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
