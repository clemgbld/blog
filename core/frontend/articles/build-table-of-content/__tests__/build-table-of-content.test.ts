import { articleBuilder } from "../../utils/article-builder";
import { buildTableOfContent } from "../build-table-of-content";

describe("build table of content", () => {
  it("should extract all non nested h2 elements to build the table of content", () => {
    const content = [
      { type: "h2", id: 1, children: [{ text: "Title 1" }] },
      { type: "h2", id: 2, children: [{ text: "Title 2" }] },
    ];
    const article = articleBuilder({ content });

    expect(buildTableOfContent(article)).toEqual({
      "Title 1": "Title 1",
      "Title 2": "Title 2",
    });
  });

  it("should not take into account other element than h2 elemments", () => {
    const content = [
      { type: "h1", id: 34, children: [{ text: "H1 Title 1" }] },
      { type: "h2", id: 1, children: [{ text: "Title 1" }] },
      { type: "h2", id: 2, children: [{ text: "Title 2" }] },
    ];
    const article = articleBuilder({ content });

    expect(buildTableOfContent(article)).toEqual({
      "Title 1": "Title 1",
      "Title 2": "Title 2",
    });
  });
});
