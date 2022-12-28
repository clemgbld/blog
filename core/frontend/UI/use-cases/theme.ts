import { RootState } from "../../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { themeSelector } from "../selectors/ui-selectors";
import { buildOsThemeService } from "../../../../infrastructure/frontend/os-theme-service/os-theme-service";
import { buildStorageService } from "../../../../infrastructure/frontend/storage-service/storage-service";

const LIGHT_MODE = "light";

const DARK_MODE = "dark";

const LIGHT_MODE_STORAGE_KEY = "blog-theme";

const isLightMode = (mode: string) => mode === LIGHT_MODE;

const getTheme = (isLightMode: boolean) =>
  isLightMode ? LIGHT_MODE : DARK_MODE;

export const getUserTheme = createAsyncThunk<
  boolean,
  void,
  {
    extra: {
      services: {
        storageService: ReturnType<typeof buildStorageService>;
        osThemeService: ReturnType<typeof buildOsThemeService>;
      };
    };
  }
>(
  "ui/get-user-theme",
  async (
    _,
    {
      extra: {
        services: { storageService, osThemeService },
      },
    }
  ) => {
    const userThemeFromStorage = storageService.getItem(LIGHT_MODE_STORAGE_KEY);

    if (userThemeFromStorage) return isLightMode(userThemeFromStorage);

    const isUserThemeFromOsLightMode = osThemeService.isLightMode();

    storageService.setItem(
      LIGHT_MODE_STORAGE_KEY,
      getTheme(isUserThemeFromOsLightMode)
    );

    return isUserThemeFromOsLightMode;
  }
);

export const toggleUserTheme = createAsyncThunk<
  boolean,
  void,
  {
    state: RootState;
    extra: {
      services: {
        storageService: ReturnType<typeof buildStorageService>;
      };
    };
  }
>(
  "ui/toggle-user-theme",
  async (
    _,
    {
      getState,
      extra: {
        services: { storageService },
      },
    }: any
  ) => {
    storageService.setItem(
      LIGHT_MODE_STORAGE_KEY,
      getTheme(!themeSelector(getState()))
    );
    return !themeSelector(getState());
  }
);
