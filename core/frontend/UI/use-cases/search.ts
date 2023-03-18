import create from "zustand/vanilla";

type SearchStore = {
  searchTerms: string;
  setSearchTerms: (searchTerms: string) => void;
};

export const createSearchStore = () =>
  create<SearchStore>((set) => ({
    searchTerms: "",
    setSearchTerms: (searchTerms: string) => set({ searchTerms }),
  }));
