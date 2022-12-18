import { pipe, curry, map } from "ramda";
import { Article } from "../../../backend/articles/entities/articles";
import { removeUndefinedAndDuplicate } from "../../utils/helper/helper";

const allTopicsWithoutDuplicatesAndUndefined = pipe(
  map(({ topic }: Article) => topic),
  removeUndefinedAndDuplicate
);

export const allTopics = (articles: Article[]) =>
  allTopicsWithoutDuplicatesAndUndefined(articles);

export const selectArticlesBasedOnTopic = curry(
  (currentTopics: string[], articles: Article[]): Article[] =>
    currentTopics.includes("all articles")
      ? articles
      : articles.filter(({ topic }) => topic && currentTopics.includes(topic))
);
