import { articleValidation } from "./validation/article-validation";
import { calcReadingTime } from "./reading-time/calculate-reading-time";

type ArticleProps = {
  id?: string;
  title?: string;
  summary?: string;
  date?: number;
  hide?: boolean;
  content?: Record<string, any>[];
  lightMode?: boolean;
  topic?: string | null;
};

export const buildArticle = ({
  id = "",
  title = "",
  summary = "",
  date = 0,
  hide = false,
  content = [],
  lightMode = false,
  topic = null,
}: ArticleProps) => {
  articleValidation({ id, title, content, date });

  return {
    id,
    title,
    summary,
    date,
    hide,
    content,
    lightMode,
    timeToRead: calcReadingTime(content),
    topic,
  };
};

export type Article = ReturnType<typeof buildArticle>;
