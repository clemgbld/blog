import { createSlice } from "@reduxjs/toolkit";

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
});
