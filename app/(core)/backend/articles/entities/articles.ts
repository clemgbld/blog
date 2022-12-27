export type Article = {
  id: string;
  title: string;
  summary: string;
  date: number;
  hide: boolean;
  content: Record<string, any>[];
  lightMode: boolean;
  timeToRead: string;
  topic: string | null;
};
