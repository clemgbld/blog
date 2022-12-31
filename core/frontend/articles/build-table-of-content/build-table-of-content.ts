import { Article } from "../../../backend/articles/entities/articles";

export const buildTableOfContent = (article: Article) =>
  article.content.reduce(
    (acc, curr) =>
      curr.type === "h2"
        ? { ...acc, [curr.children[0].text]: curr.children[0].text }
        : acc,
    {}
  );
