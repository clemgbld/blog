import { pipe, curry, map } from "ramda";
import { Article } from "../../../backend/articles/entities/articles";
import { removeUndefinedAndDuplicate } from "../../utils/helper/helper";

const allTopicsWithoutDuplicatesAndUndefined = pipe(
  map(({ topic }: Article) => topic),
  removeUndefinedAndDuplicate
);

export const allTopics = (articles: Article[]) =>
  allTopicsWithoutDuplicatesAndUndefined(articles);

const ALL_ARTICLES = "all articles";

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
  selectedTopic === "all articles"
    ? articles.length
    : articles.filter(({ topic }) => selectedTopic === topic).length;
