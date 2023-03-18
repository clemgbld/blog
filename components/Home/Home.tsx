"use client";
import { FC, useState, useMemo, useEffect } from "react";
import { pipe } from "ramda";

import { Article } from "../../core/backend/articles/entities/articles";
import ArticleCard from "./ArticleCard/ArticleCard";
import Tag from "./Tag/Tag";
import PaginationFooter from "./PaginationFooter/PaginationFooter";
import { allArticlesFormatted } from "../../core/frontend/articles/selectors/formatting/format-articles";
import { searchSelector } from "../../core/frontend/articles/selectors/search/select-searched-article";
import { useSearchStore } from "../../hooks/useSearchStore";
import {
  allTopics,
  countArticlesInTopic,
  selectArticlesBasedOnTopic,
  handleSelectedTopics,
  ALL_ARTICLES,
} from "../../core/frontend/articles/selectors/topics/topics";
import { sortByMostRecent } from "../../core/frontend/articles/selectors/sort-by-most-recent/sort-by-most-recent";
import classNames from "./Home.module.scss";
import {
  ARTICLES_PER_PAGE,
  selectArticlesOnPage,
  shycronisePaginationWithOtherFilters,
} from "../../core/frontend/articles/selectors/pagination/pagination";

type HomeProps = {
  articles: Article[];
  articlesPerPage?: number;
};

const Home: FC<HomeProps> = ({
  articles,
  articlesPerPage = ARTICLES_PER_PAGE,
}) => {
  const [currentTopics, setCurrentTopics] = useState<string[]>([ALL_ARTICLES]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchTerms = useSearchStore((state) => state.searchTerms);
  const handleArticles = useMemo(
    () =>
      pipe(
        sortByMostRecent,
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

  const articlesToDisplay = useMemo(
    () => selectArticlesOnPage(currentPage, articlesPerPage, filteredArticles),
    [currentPage, filteredArticles, articlesPerPage]
  );

  useEffect(() => {
    setCurrentPage(shycronisePaginationWithOtherFilters(articlesToDisplay));
  }, [articlesToDisplay]);

  return (
    <div className={`page ${classNames.box}`}>
      <div>
        <h1 className={classNames.title}>Blog Posts:</h1>
        {filteredArticles.length === 0 ? (
          <p>No articles!</p>
        ) : (
          <div className={classNames.articles}>
            {articlesToDisplay.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
        <PaginationFooter
          currentPage={currentPage}
          articlesPerPage={articlesPerPage}
          articles={filteredArticles}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div>
        <h2 className={classNames.title}>Topics:</h2>
        <div className={classNames.tags}>
          {allTopics(articles).map((topic) => (
            <Tag
              className={
                currentTopics.includes(topic) ? classNames["tag--active"] : ""
              }
              key={topic}
              onClick={() => setCurrentTopics(handleSelectedTopics(topic))}
              label={`${topic} (${countArticlesInTopic(topic, articles)})`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
