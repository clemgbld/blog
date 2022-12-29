import { articleBuilder } from "../../utils/article-builder";
import {
  allTopics,
  selectArticlesBasedOnTopic,
  countArticlesInTopic,
  handleSelectedTopics,
} from "../topics";

describe("topics", () => {
  it("should get a list of the topic of all articles", () => {
    const articles = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
    ];
    expect(allTopics(articles)).toEqual([
      "all articles",
      "Functional-Programing",
      "OOP",
    ]);
  });

  it("should remove all duplicate topics", () => {
    const articlesWithDuplicateTopic = [
      articleBuilder({ topic: "Functional-Programing" }),
      articleBuilder({ topic: "OOP" }),
      articleBuilder({ topic: "OOP" }),
    ];

    expect(allTopics(articlesWithDuplicateTopic)).toEqual([
      "all articles",
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
      "all articles",
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

  describe("count number of articles in a topic", () => {
    const articles = [articleBuilder({}), articleBuilder({ topic: "react" })];
    it("should count all articles", () => {
      expect(countArticlesInTopic("all articles", articles)).toBe(2);
    });

    it("should only count articles in a specfic topic", () => {
      expect(countArticlesInTopic("react", articles)).toBe(1);
    });
  });

  describe("handle the list of selected topic", () => {
    it("adds a topic to an empty list", () => {
      expect(handleSelectedTopics("React", [])).toEqual(["React"]);
    });

    it("should delete the topic if the selected topic is already in the list", () => {
      expect(handleSelectedTopics("React", ["React", "Vue"])).toEqual(["Vue"]);
    });

    it("should should add all articles when we delete the last topic from the list", () => {
      expect(handleSelectedTopics("React", ["React"])).toEqual([
        "all articles",
      ]);
    });

    it("should remove all topics when we add all articles", () => {
      expect(handleSelectedTopics("all articles", ["React"])).toEqual([
        "all articles",
      ]);
    });

    it("should remove all articles when it is the first element when we add another topic", () => {
      expect(handleSelectedTopics("React", ["all articles"])).toEqual([
        "React",
      ]);
    });
  });
});
