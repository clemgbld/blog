export type ArticleWithStringifyContent = {
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
