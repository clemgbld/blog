import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { createStore } from "../../../core/frontend/store";
import {
  fakeArticle1,
  fakeArticle2,
} from "../../../core/backend/articles/fixtures/articles-fixtures";
import { Article } from "../../../core/backend/articles/entities/articles";
import Home from "../Home";
import Header from "../../Header/Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Home", () => {
  const renderHome = (articles: Article[] = [fakeArticle1, fakeArticle2]) => {
    const store = createStore({});

    render(
      <Provider store={store}>
        <Header>
          <Home articles={articles} />
        </Header>
      </Provider>
    );
  };

  describe("articles rendering", () => {
    it("should dispaly a message when there is no articles", () => {
      renderHome([]);
      expect(screen.getByText("No articles yet!")).toBeInTheDocument();
    });

    it("should should display blog articles when there is any", () => {
      renderHome();
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

      expect(
        screen.getByText("React Performance: How to avoid redundant re-renders")
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application."
        )
      ).toBeInTheDocument();

      expect(screen.getByText("17/10/2022")).toBeInTheDocument();

      expect(screen.getByText("7 min read")).toBeInTheDocument();

      expect(screen.getByText("React")).toBeInTheDocument();

      expect(screen.queryByText("No articles yet!")).not.toBeInTheDocument();
    });
  });

  describe("search feature", () => {
    it("should filter out the first article", async () => {
      renderHome();
      const searchBar = screen.getByRole("textbox");
      await userEvent.type(searchBar, "React");
      expect(searchBar).toHaveValue("React");
      expect(screen.getAllByTestId("article").length).toBe(1);
    });
  });
});
