import { Article } from "../../../backend/articles/entities/articles";
import { formatDateDDMMYYYY } from "../../utils/date/format-date";

export type FormattedArticle = {
  id: string;
  summary?: string;
  topic?: string | null;
  title: string;
  date: string;
  hide?: boolean;
  content: any;
  lightMode: boolean;
  timeToRead: string;
};

export const allArticlesFormatted = (articles: Article[]): FormattedArticle[] =>
  articles.map((article: Article) => ({
    ...article,
    date: formatDateDDMMYYYY(new Date(article.date)),
  }));
