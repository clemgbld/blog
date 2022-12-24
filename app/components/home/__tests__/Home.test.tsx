import { render, screen } from "@testing-library/react";
import {
  fakeArticle1,
  fakeArticle2,
} from "../../../core/backend/articles/fixtures/articles-fixtures";
import Home from "../Home";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("should dispaly a message when there is no articles", () => {
    render(<Home articles={[]} />);
    expect(screen.getByText("No articles yet!")).toBeInTheDocument();
  });

  it("should should display blog articles when there is any", () => {
    const articles = [fakeArticle1, fakeArticle2];
    render(<Home articles={articles} />);
    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      "/article/1"
    );
    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/article/2"
    );

    const imgEl1: any = screen.getAllByAltText("")[0];

    expect(imgEl1.src).toBe(
      "https://isamatov.com/images/react-avoid-redundant-renders/React%20Performance-%20How%20to%20avoid%20redundant%20re-renders.png"
    );
    expect(screen.queryByText("No article yet...")).not.toBeInTheDocument();

    expect(screen.queryByText("No articles yet!")).not.toBeInTheDocument();
  });
});
