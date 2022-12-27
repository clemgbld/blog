export type ArticleWithStringifyContent = {
  topic: string | null;
  timeToRead: string;
  id: string;
  title: string;
  summary: string;
  date: number;
  content: string;
  hide: boolean;
  lightMode: boolean;
};

export type ArticlesRepository = {
  allArticlesPublished: () => Promise<ArticleWithStringifyContent[]>;
  getPublishedArticle: (
    id: string
  ) => Promise<ArticleWithStringifyContent | undefined>;
};
