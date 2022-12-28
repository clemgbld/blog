import create from "zustand";
import { createSearchStore } from "../core/frontend/UI/search";

export const useSearchStore = create(createSearchStore());
