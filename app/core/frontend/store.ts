import {
  configureStore,
  combineReducers,
  StateFromReducersMapObject,
  PreloadedState,
} from "@reduxjs/toolkit";
import { uiSlice } from "./UI/ui-slice";
import { buildStorageService } from "../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../infrastructure/frontend/os-theme-service/os-theme-service";
import { buildInMemoryStorage } from "../../infrastructure/frontend/storage-service/in-memory-storage";

const reducer = {
  [uiSlice.name]: uiSlice.reducer,
};

const rootReducer = combineReducers(reducer);

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const createStore = ({
  services = {
    storageService: buildStorageService(buildInMemoryStorage()),
    osThemeService: buildOsThemeService(),
  },
  preloadedState,
}: {
  services?: {
    storageService: ReturnType<typeof buildStorageService>;
    osThemeService: ReturnType<typeof buildOsThemeService>;
  };
  preloadedState?: PreloadedState<RootState>;
}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            services,
          },
        },
      }),
  });

type Store = ReturnType<typeof createStore>;

export type AppDispatch = Store["dispatch"];
