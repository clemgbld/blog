import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { uiSlice } from "./UI/ui-slice";

const rootReducer = combineReducers({
  [uiSlice.name]: uiSlice.reducer,
});

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });
