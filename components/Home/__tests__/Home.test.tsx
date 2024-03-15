import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  fakeArticle1,
  fakeArticle2,
} from "../../../core/backend/articles/fixtures/articles-fixtures";
import Home from "../Home";
import Header from "../../common/Header/Header";
import { useSearchStore } from "../../../hooks/useSearchStore";
import { ARTICLES_PER_PAGE } from "../../../core/frontend/articles/selectors/pagination/pagination";

jest.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div />,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

afterEach(() => {
  const originalState = useSearchStore.getState();
  useSearchStore.setState({ ...originalState, searchTerms: "" });
});

describe("Home", () => {
  const renderHome = ({
    articles = [fakeArticle1, fakeArticle2],
    articlesPerPage = ARTICLES_PER_PAGE,
  }) => {
    render(
      <Header>
        <Home articles={articles} articlesPerPage={articlesPerPage} />
      </Header>
    );
  };

  describe("articles rendering", () => {
    it("should dispaly a message when there is no articles", () => {
      renderHome({ articles: [] });
      expect(screen.getByText("No articles!")).toBeInTheDocument();
    });

    it("should should display blog articles when there is any", () => {
      renderHome({});
      expect(screen.getAllByRole("link")[2]).toHaveAttribute(
        "href",
        "/article/1"
      );
      expect(screen.getAllByRole("link")[3]).toHaveAttribute(
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

      expect(screen.queryByText("No articles!")).not.toBeInTheDocument();
    });
  });

  describe("search feature", () => {
    it("should filter out the first article", async () => {
      renderHome({});
      const searchBar = screen.getByTestId("search");
      await userEvent.type(searchBar, "React");
      expect(searchBar).toHaveValue("React");
      expect(screen.getAllByTestId("article").length).toBe(1);
    });
  });

  describe("topic feature", () => {
    it("should filter out all no react topic", async () => {
      renderHome({});
      const reactTopic = screen.getByText("React (1)");
      await userEvent.click(reactTopic);
      expect(screen.getAllByTestId("article").length).toBe(1);
    });
  });

  describe("pagination feature", () => {
    it("should be able to go to the next page", async () => {
      renderHome({ articlesPerPage: 1 });

      await userEvent.click(screen.getByText("2"));

      expect(screen.getAllByTestId("article").length).toBe(1);
    });

    it("should be able to adapt the number of pages withe other filter", async () => {
      renderHome({ articlesPerPage: 1 });

      await userEvent.click(screen.getByText("React (1)"));

      expect(screen.queryByText("2")).not.toBeInTheDocument();
    });

    it("should not paginate articles when there is only only one page", async () => {
      renderHome({});

      expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("should automaticly go to the previous page when there is no article due to the other filter", async () => {
      renderHome({ articlesPerPage: 1 });

      await userEvent.click(screen.getByText("2"));
      await userEvent.click(screen.getByText("React (1)"));

      expect(screen.getAllByTestId("article").length).toBe(1);
    });
  });
});
