import { render } from "@testing-library/react";

import Home from "../page";

describe("Home", () => {
  it("should render home page", () => {
 
    render(<Home />);
  });
});
