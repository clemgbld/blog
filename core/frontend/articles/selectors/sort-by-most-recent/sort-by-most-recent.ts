import { Article } from "../../../../backend/articles/entities/articles";

export const sortByMostRecent = (articles: Article[]) =>
  articles.slice().sort((a, b) => b.date - a.date);
