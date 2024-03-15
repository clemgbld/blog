import { render, screen } from "@testing-library/react";

import Header from "../Header";
import * as hooks from "next/navigation";

jest.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div />,
}));

describe("Header", () => {
  const renderHeader = () => {
    render(
      <Header>
        <div />
      </Header>
    );
  };

  it("should not render search bar when pathname is not /", () => {
    jest.spyOn(hooks, "usePathname").mockImplementation(() => "/article/1");
    renderHeader();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
