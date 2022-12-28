import create from "zustand/vanilla";

type Search = {
  searchTerms: string;
  setSearchTerms: (searchTerms: string) => void;
};

export const createSearchStore = () =>
  create<Search>((set) => ({
    searchTerms: "",
    setSearchTerms: (searchTerms: string) => set({ searchTerms }),
  }));
