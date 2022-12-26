import { createStore } from "../../store";
import { updateSearchTerms } from "../use-cases/search";

describe("search feature", () => {
  it("should have no text initially", () => {
    const store = createStore();

    expect(store.getState().ui.searchTerms).toBe("");
  });

  it("should update search terms", () => {
    const store = createStore();

    store.dispatch(updateSearchTerms("React"));

    expect(store.getState().ui.searchTerms).toBe("React");
  });
});
