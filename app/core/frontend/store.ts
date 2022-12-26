import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { uiSlice } from "./UI/ui-slice";
import { buildStorageService } from "../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../infrastructure/frontend/os-theme-service/os-theme-service";
import { buildInMemoryStorage } from "../../infrastructure/frontend/storage-service/in-memory-storage";

const rootReducer = combineReducers({
  [uiSlice.name]: uiSlice.reducer,
});

export const createStore = ({
  services = {
    storageService: buildStorageService(buildInMemoryStorage()),
    osThemeService: buildOsThemeService(),
  },
}: {
  services?: {
    storageService: ReturnType<typeof buildStorageService>;
    osThemeService: ReturnType<typeof buildOsThemeService>;
  };
}) =>
  configureStore({
    reducer: rootReducer,
  });
