import { allArticlesFormatted } from "../format-articles";
import { articleBuilder } from "../../utils/article-builder";

const articles = [articleBuilder()];

describe("normalize all articles", () => {
  it("shoudld normalize the articles by transforming the time stamp in date string", () => {
    expect(allArticlesFormatted(articles)).toEqual([
      {
        id: "1",
        title: "article 1",
        date: "20/07/7245",
        lightMode: true,
        timeToRead: "2 min read",
        content: [
          {
            type: "paragraph",
            children: [{ text: "A first line of text." }],
          },
          {
            type: "paragraph",
            children: [{ text: "A second line of text." }],
          },
        ],
      },
    ]);
  });
});
