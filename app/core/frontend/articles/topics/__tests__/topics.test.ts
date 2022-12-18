import { articleBuilder } from "../../utils/article-builder";
import { allTopics, selectArticlesBasedOnTopic } from "../topics";
describe("topics", () => {
  it("should get a list of the topic of all articles", () => {
    const articles = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
    ];
    expect(allTopics(articles)).toEqual(["Functional-Programing", "OOP"]);
  });

  it("should remove all duplicate topics", () => {
    const articlesWithDuplicateTopic = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
      articleBuilder({ topic: "OOP" }),
    ];

    expect(allTopics(articlesWithDuplicateTopic)).toEqual([
      "Functional-Programing",
      "OOP",
    ]);
  });

  it("should remove undefined from the topic list", () => {
    const articlesWithUndefined = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
      articleBuilder(),
    ];

    expect(allTopics(articlesWithUndefined)).toEqual([
      "Functional-Programing",
      "OOP",
    ]);
  });

  describe("select articles based on the current topic", () => {
    it("should select all articles when there is the topic all articles", () => {
      expect(
        selectArticlesBasedOnTopic(
          ["all articles"],
          [articleBuilder({ topic: "react" })]
        )
      ).toEqual([articleBuilder({ topic: "react" })]);
    });

    it("should select articles based on topic", () => {
      expect(
        selectArticlesBasedOnTopic(
          ["react"],
          [articleBuilder({ topic: "react" }), articleBuilder()]
        )
      ).toEqual([articleBuilder({ topic: "react" })]);
    });

    it("should select articles based on topics", () => {
      expect(
        selectArticlesBasedOnTopic(
          ["react", "vue"],
          [
            articleBuilder({ topic: "react" }),
            articleBuilder({ topic: "vue" }),
            articleBuilder(),
          ]
        )
      ).toEqual([
        articleBuilder({ topic: "react" }),
        articleBuilder({ topic: "vue" }),
      ]);
    });
  });
});
