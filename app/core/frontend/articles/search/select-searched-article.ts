import { compose } from "ramda";
import { curry } from "ramda";
import { Article } from "../../../backend/articles/entities/articles";

const extractTextField = (str?: string) =>
  str?.match(/"(text)":("([^""]+)"|\[[^[]+])/gim);

const replaceAllTextKeyByNothing = (str?: string) =>
  str?.replace(/"text":/gi, ";");

const isSearchvalueInText = (text: string | undefined, searchValue: string) =>
  new RegExp(searchValue.toLowerCase().trim()).test(text?.toLowerCase() || "");

const extractTextFromContent: (...args: any[]) => string | undefined = compose(
  replaceAllTextKeyByNothing,
  (str?: string[] | null) => str?.join(";"),
  extractTextField,
  JSON.stringify
);

export const searchSelector = curry(
  (searchTerms: string, articles: Article[]): Article[] =>
    searchTerms.length < 3
      ? articles
      : articles.filter(
          ({ timeToRead, title, summary = "", content }) =>
            isSearchvalueInText(title, searchTerms) ||
            isSearchvalueInText(timeToRead, searchTerms) ||
            isSearchvalueInText(summary, searchTerms) ||
            isSearchvalueInText(extractTextFromContent(content), searchTerms)
        )
);
