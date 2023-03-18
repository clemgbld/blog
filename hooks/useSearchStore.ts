import create from "zustand";
import { createSearchStore } from "../core/frontend/UI/use-cases/search";

export const useSearchStore = create(createSearchStore());
