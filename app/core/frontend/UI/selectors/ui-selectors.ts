import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const themeSelector = createSelector(
  (state: RootState) => state.ui,
  (ui: { searchTerms: string; isLightMode: boolean }) => ui.isLightMode
);
