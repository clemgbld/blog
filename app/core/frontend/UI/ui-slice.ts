import { createSlice } from "@reduxjs/toolkit";
import { getUserTheme } from "./use-cases/theme";

export const initialState = {
  searchTerms: "",
  isLightMode: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserTheme.fulfilled, (state, action) => {
      state.isLightMode = action.payload;
    });
  },
});
