import { createSearchStore } from "../search";

describe("search", () => {
  it("should have an empty string as search sting initially", () => {
    const searchStore = createSearchStore();
    expect(searchStore.getState().searchTerms).toBe("");
  });

  it("should update search terms", () => {
    const searchStore = createSearchStore();
    searchStore.getState().setSearchTerms("React");
    expect(searchStore.getState().searchTerms).toBe("React");
  });
});
