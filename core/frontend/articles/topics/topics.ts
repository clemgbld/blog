import { pipe, curry, map } from "ramda";
import { Article } from "../../../backend/articles/entities/articles";
import { removeUndefinedAndDuplicate } from "../../utils/helper/helper";

export const ALL_ARTICLES = "all articles";

const shiftAllArticles = (topics: string[]) => [ALL_ARTICLES, ...topics];

const allTopicsWithoutDuplicatesAndUndefined = pipe(
  map(({ topic }: Article) => topic),
  removeUndefinedAndDuplicate<string>,
  shiftAllArticles
);

export const allTopics = (articles: Article[]) =>
  allTopicsWithoutDuplicatesAndUndefined(articles);

export const selectArticlesBasedOnTopic = curry(
  (currentTopics: string[], articles: Article[]): Article[] =>
    currentTopics.includes(ALL_ARTICLES)
      ? articles
      : articles.filter(({ topic }) => topic && currentTopics.includes(topic))
);

export const countArticlesInTopic = (
  selectedTopic: string,
  articles: Article[]
) =>
  selectedTopic === ALL_ARTICLES
    ? articles.length
    : articles.filter(({ topic }) => selectedTopic === topic).length;

export const handleSelectedTopics = curry((topic: string, topics: string[]) => {
  if (topics.at(0) === "all articles") return [topic];
  if (topic === "all articles") return ["all articles"];
  if (!topics.includes(topic)) return [...topics, topic];
  const filteredTopics = topics.filter((t) => t !== topic);
  return filteredTopics.length === 0 ? ["all articles"] : filteredTopics;
});
