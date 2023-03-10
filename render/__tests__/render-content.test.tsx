import { render, screen } from "@testing-library/react";
import { renderContent } from "../render-content";

describe("renderContent", () => {
  describe("rendering", () => {
    it("should render nothing when there is no content", () => {
      expect(renderContent([])).toEqual(null);
    });

    it("should be able to render without children and without crashing", () => {
      const content = [{ type: "div", id: 1 }];

      render(<div>{renderContent(content)}</div>);
    });

    it("should be able to render a simple node", () => {
      const content = [{ type: "h1", id: 1, children: [{ text: "Title" }] }];

      render(<div>{renderContent(content)}</div>);

      const h1Element = screen.getByText("Title");

      expect(h1Element.tagName).toBe("H1");
    });

    it("should be able to render multiple not nested nodes", () => {
      const content = [
        { type: "p", id: 1, children: [{ text: "text1" }] },
        { type: "p", id: 2, children: [{ text: "text2" }] },
      ];

      render(<div>{renderContent(content)}</div>);

      expect(screen.getByText("text1")).toBeInTheDocument();
      expect(screen.getByText("text2")).toBeInTheDocument();
    });

    it("should be able to render multiple deeply nested nodes", () => {
      const content = [
        {
          type: "ul",
          id: 1,
          children: [
            {
              type: "li",
              id: 2,
              children: [{ type: "lic", id: 3, children: [{ text: "li1" }] }],
            },
            {
              type: "li",
              id: 4,
              children: [{ type: "lic", id: 5, children: [{ text: "li2" }] }],
            },
            {
              type: "li",
              id: 6,
              children: [{ type: "lic", id: 7, children: [{ text: "li3" }] }],
            },
          ],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      expect(screen.getByText("li1")).toBeInTheDocument();
      expect(screen.getByText("li2")).toBeInTheDocument();
      expect(screen.getByText("li3")).toBeInTheDocument();
    });
  });

  it("should render a break line when there is only an empty text in a paragraph element", () => {
    const content = [
      { type: "p", dataTestId: "p", id: 1, children: [{ text: "" }] },
    ];

    render(renderContent(content));

    const pElement = screen.getByTestId("p");

    expect(pElement.children[0].tagName).toBe("BR");
  });

  describe("style", () => {
    it("create an element without any styling when not specify", () => {
      const content = [{ type: "h1", id: 1, children: [{ text: "Title" }] }];

      render(<div>{renderContent(content)}</div>);

      const h1Element = screen.getByText("Title");

      expect(h1Element.tagName).toBe("H1");

      expect(h1Element.style.fontWeight).toBe("");
      expect(h1Element.style.fontStyle).toBe("");
      expect(h1Element.style.textDecoration).toBe("");
      expect(h1Element.style.textAlign).toBe("");
    });

    it("should be able to make a text bold", () => {
      const content = [
        { type: "h1", id: 1, children: [{ text: "Title", bold: true }] },
      ];
      render(<div>{renderContent(content)}</div>);

      const h1Element = screen.getByText("Title");

      expect(h1Element.style.fontWeight).toBe("700");
    });

    it("should be able to make a text italic", () => {
      const content = [
        { type: "h1", id: 1, children: [{ text: "Title", italic: true }] },
      ];

      render(<div>{renderContent(content)}</div>);

      const h1Element = screen.getByText("Title");

      expect(h1Element.style.fontStyle).toBe("italic");
    });

    it("should be able to underline a text", () => {
      const content = [
        { type: "h1", id: 1, children: [{ text: "Title", underline: true }] },
      ];

      render(<div>{renderContent(content)}</div>);

      const h1Element = screen.getByText("Title");

      expect(h1Element.style.textDecoration).toBe("underline");
    });

    it("should align the pargarph to the center", () => {
      const content = [
        {
          type: "p",
          id: 1,
          align: "center",
          children: [{ text: "paragraph" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.textAlign).toBe("center");
    });

    it("should align the pargarph to the right", () => {
      const content = [
        {
          type: "p",
          id: 1,
          align: "right",
          children: [{ text: "paragraph" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.textAlign).toBe("right");
    });

    it("should be able to render an image without any text inside", () => {
      const content = [
        {
          type: "img",
          id: 1,
          caption: ["caption 1"],
          url: "https://my-url",
          children: [{ text: "" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const img: any = screen.getByAltText("caption 1");

      expect(img.src).toBe("https://my-url/");
    });

    it("should render an image with an alt even when there is no caption", () => {
      const content = [
        {
          type: "img",
          id: 1,
          url: "https://my-url",
          children: [{ text: "" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      expect(screen.getByAltText("")).toBeInTheDocument();
    });

    it("should be able to add a with to an element and convert it to rem", () => {
      const content = [
        {
          type: "img",
          id: 1,
          url: "https://my-url",
          width: 424,
          children: [{ text: "" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const imgElement = screen.getByAltText("");

      expect(imgElement.style.width).toBe("42.4rem");
    });

    it("should add object fit cover to the style of the element when it is an img", () => {
      const content = [
        {
          type: "img",
          id: 1,
          url: "https://my-url",
          width: 424,
          children: [{ text: "" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const imgElement = screen.getByAltText("");

      expect(imgElement.style.objectFit).toBe("cover");
    });

    it("should be able to build a link", () => {
      const content = [
        {
          type: "a",
          id: 1,
          url: "https://my-url",
          children: [{ text: "my url" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const aElement: any = screen.getByText("my url");

      expect(aElement.href).toBe("https://my-url/");
    });

    it("should be able to add 3.6rem to h1 element", () => {
      const content = [{ type: "h1", id: 1, children: [{ text: "Title" }] }];

      render(<div>{renderContent(content)}</div>);

      const h1Element = screen.getByText("Title");

      expect(h1Element.style.marginBottom).toBe("3.6rem");
    });

    it("should be able to add 2.4rem to h2 element", () => {
      const content = [{ type: "h2", id: 1, children: [{ text: "Title" }] }];

      render(<div>{renderContent(content)}</div>);

      const h2Element = screen.getByText("Title");

      expect(h2Element.style.marginBottom).toBe("2.4rem");
    });

    it("should be able to add 1.6 rem to h3 element", () => {
      const content = [{ type: "h3", id: 1, children: [{ text: "Title" }] }];

      render(<div>{renderContent(content)}</div>);

      const h3Element = screen.getByText("Title");

      expect(h3Element.style.marginBottom).toBe("1.6rem");
    });

    it("should be able to render a properly styled blockquote", () => {
      const content = [
        { type: "blockquote", id: 1, children: [{ text: "quote" }] },
      ];

      render(<div>{renderContent(content)}</div>);

      const blockquoteElement = screen.getByText("quote");

      expect(blockquoteElement.style.marginTop).toBe("0.5rem");
      expect(blockquoteElement.style.marginBottom).toBe("0.5rem");
      expect(blockquoteElement.style.marginLeft).toBe("0px");
      expect(blockquoteElement.style.marginRight).toBe("0px");
      expect(blockquoteElement.style.borderLeft).toBe("2px solid #ddd");
      expect(blockquoteElement.style.padding).toBe("1rem 2rem 1rem 1.6rem");
      expect(blockquoteElement.style.color).toBe("rgb(170, 170, 170)");
    });

    it("should be able to render media in an iframe", () => {
      const content = [
        {
          type: "media_embed",
          id: 1,
          url: "https://www.youtube.com/watch?v=zdYzL6wkr0A?modestbranding=1",
          children: [{ text: "" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const iframeElement: any = screen.getByTitle("Youtube video player");

      expect(iframeElement.tagName).toBe("IFRAME");
      expect(iframeElement.style.width).toBe("100%");
      expect(iframeElement.style.height).toBe("315px");
      expect(iframeElement.frameBorder).toBe("0");
    });

    it("should have a width of 100% when the html element is a table", () => {
      const content = [
        {
          type: "table",
          dataTestId: "table",
          id: 1,

          children: [{ text: "" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const tableElement = screen.getByTestId("table");

      expect(tableElement.style.width).toBe("100%");
    });

    it("should ba able to add a background color", () => {
      const content = [
        {
          type: "p",
          id: 1,
          children: [{ text: "paragraph", backgroundColor: "red" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.backgroundColor).toBe("red");
    });

    it("should ba able to add a line-through to text", () => {
      const content = [
        {
          type: "p",
          strikethrough: true,
          id: 1,
          children: [{ text: "paragraph" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.textDecoration).toBe("line-through");
    });

    it("should be able to indent content", () => {
      const content = [
        {
          type: "p",
          indent: 2,
          id: 1,
          children: [{ text: "paragraph" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.marginLeft).toBe("5rem");
    });

    it("should be able to apply superscript to text", () => {
      const content = [
        {
          type: "p",
          id: 1,
          children: [{ text: "paragraph", superscript: true }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.verticalAlign).toBe("super");
      expect(pElement.style.fontSize).toBe("50%");
    });

    it("should be able to apply subscript on element", () => {
      const content = [
        {
          type: "p",
          id: 1,
          children: [{ text: "paragraph", subscript: true }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const pElement = screen.getByText("paragraph");

      expect(pElement.style.verticalAlign).toBe("sub");
      expect(pElement.style.fontSize).toBe("50%");
    });

    it("should wrap text into a span when the text is not the first one and have different style", () => {
      const content = [
        {
          type: "p",
          id: 1,
          children: [
            { text: "paragraph" },
            { text: "special paragraph", bold: true },
          ],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      const spanElement = screen.getByText("special paragraph");

      expect(spanElement.tagName).toBe("SPAN");
      expect(spanElement.style.fontWeight).toBe("700");
    });
  });
  describe("code snipet", () => {
    it("should not crash when rendering a code snipet", () => {
      const content = [
        {
          type: "code_block",
          id: 1234,
          lang: "jsx",
          children: [
            {
              id: 1,
              type: "code_line",
              children: [
                { text: "class HelloMessage extends React.Component {" },
              ],
            },
            {
              id: 2,
              type: "code_line",
              children: [{ text: "  handlePress = () => {" }],
            },
            {
              id: 3,
              type: "code_line",
              children: [{ text: "    alert('Hello')" }],
            },
          ],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      expect(document.querySelectorAll("code").length).toBe(2);
    });
  });

  describe("h2", () => {
    it("should have an h2 element with the title of the element as id", () => {
      const content = [
        {
          type: "h2",
          id: 1,
          children: [{ text: "title" }],
        },
      ];

      render(<div>{renderContent(content)}</div>);

      expect(screen.getByText("title")).toHaveAttribute("id", "title");
    });
  });
});
