import { buildArticle } from "../articles";

const content = [{ id: "1", type: "h1", children: [{ text: "word" }] }];

const buildPhrase = (numberOfWord: number) => "word ".repeat(numberOfWord);

const buildSimpleContent = (text: string) => [
  { id: "1", type: "h1", children: [{ text }] },
];

describe("articles", () => {
  describe("given that there is no reading time calculate reading time of an article", () => {
    it("should make a 1 min to read article when there is less than 238 words in the article", () => {
      const article = buildArticle({
        id: "abc",
        title: "title 1",
        summary: "summary 1",
        date: 134435,
        hide: false,
        content,
        lightMode: false,
      });

      expect(article).toEqual({
        id: "abc",
        title: "title 1",
        summary: "summary 1",
        date: 134435,
        hide: false,
        content,
        lightMode: false,
        timeToRead: "1 min read",
        topic: null,
      });
    });
    it("should be able to handle article with complex data structure", () => {
      const content = [
        {
          type: "ul",
          children: [
            { type: "li", children: [{ text: buildPhrase(237) }] },
            { type: "li", children: [{ text: buildPhrase(237) }] },
            { type: "li", children: [{ text: buildPhrase(237) }] },
          ],
        },
      ];

      const article = buildArticle({
        id: "abc",
        title: "title 1",
        date: 134435,
        content,
      });

      expect(article).toEqual({
        id: "abc",
        title: "title 1",
        summary: "",
        date: 134435,
        content,
        timeToRead: "4 min read",
        lightMode: false,
        hide: false,
        topic: null,
      });
    });

    it("should be able to handle article that has content with various element", () => {
      const content = [
        ...buildSimpleContent(buildPhrase(475)),

        { type: "div", id: 1 },
        {
          type: "img",
          id: 1,
          caption: ["caption 1"],
          url: "https://my-url",
          children: [{ text: buildPhrase(475) }],
        },
      ];

      const article = buildArticle({
        id: "abc",
        title: "title 1",
        date: 134435,
        content,
      });

      expect(article).toEqual({
        id: "abc",
        title: "title 1",
        summary: "",
        date: 134435,
        content,
        timeToRead: "5 min read",
        lightMode: false,
        hide: false,
        topic: null,
      });
    });
  });

  describe("validation", () => {
    it("should fails fast when the article does not have any content", () => {
      expect(() =>
        buildArticle({
          id: "abc",
          title: "title 1",
          date: 134435,
          content: [],
        })
      ).toThrow("An article must have a content");

      expect(() =>
        buildArticle({
          id: "abc",
          title: "title 1",
          date: 134435,
        })
      ).toThrow("An article must have a content");
    });

    it("should fail fast when an article does not have a title", () => {
      expect(() =>
        buildArticle({
          id: "abc",
          date: 134435,
          content: [buildSimpleContent("text")],
        })
      ).toThrow("An article must have a title");
    });

    it("should fail fast when an article does not have a date", () => {
      expect(() =>
        buildArticle({
          id: "abc",
          title: "title",
          content: [buildSimpleContent("text")],
        })
      ).toThrow("An article must have a date");
    });

    it("should  fail fast when an article does not have an id", () => {
      expect(() =>
        buildArticle({
          title: "title",
          date: 123423543,
          content: [buildSimpleContent("text")],
        })
      ).toThrow("An article must have an id");
    });
  });
});
