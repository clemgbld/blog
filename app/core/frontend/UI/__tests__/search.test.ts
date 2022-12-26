import { createStore } from "../../store";

describe("search feature", () => {
  it("should have no text initially", () => {
    const store = createStore();

    expect(store.getState().ui.searchTerms).toBe("");
  });
});
