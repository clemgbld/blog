import { PreloadedState } from "@reduxjs/toolkit";
import { createStore, RootState } from "../../../store";
import { buildInMemoryStorage } from "../../../../../infrastructure/frontend/storage-service/in-memory-storage";
import { buildStorageService } from "../../../../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../../../../infrastructure/frontend/os-theme-service/os-theme-service";
import { buildInMemoryMatchMedia } from "../../../../../infrastructure/frontend/os-theme-service/in-memory-match-media";
import { getUserTheme, toggleUserTheme } from "../theme";
import { themeSelector } from "../../selectors/ui-selectors";

describe("theme feature", () => {
  const setUp = ({
    existingStorage = {},
    inMemoryMatchMedia,
    preloadedState,
  }: {
    existingStorage?: Record<string, string>;
    inMemoryMatchMedia?: ReturnType<typeof buildInMemoryMatchMedia>;
    preloadedState?: PreloadedState<RootState>;
  }) => {
    const inMemoryStorage = buildInMemoryStorage(existingStorage);
    const storageService = buildStorageService(inMemoryStorage);
    const osThemeService = buildOsThemeService(inMemoryMatchMedia);
    const store = createStore({
      services: {
        storageService,
        osThemeService,
      },
      preloadedState,
    });

    return {
      store,
      inMemoryStorage,
    };
  };

  describe("getUserTheme", () => {
    it("should have a light mode set to true initially", () => {
      const store = createStore({});
      expect(themeSelector(store.getState())).toBe(true);
    });

    it("should be in dark mode when this mode is already in the storage", async () => {
      const { store } = setUp({ existingStorage: { "blog-theme": "dark" } });
      await store.dispatch(getUserTheme());

      expect(themeSelector(store.getState())).toBe(false);
    });

    it("should be in light mode when this mode is already in the storage", async () => {
      const { store } = setUp({
        existingStorage: { "blog-theme": "light" },
        preloadedState: {
          ui: {
            searchTerms: "",
            isLightMode: false,
          },
        },
      });

      await store.dispatch(getUserTheme());

      expect(themeSelector(store.getState())).toBe(true);
    });

    it("should be in light mode when there is no theme in the storage source and that we cannot access the os of the user", async () => {
      const { store, inMemoryStorage } = setUp({
        preloadedState: {
          ui: {
            searchTerms: "",
            isLightMode: false,
          },
        },
        inMemoryMatchMedia: undefined,
      });
      await store.dispatch(getUserTheme());

      expect(themeSelector(store.getState())).toBe(true);
      expect(inMemoryStorage.getItem("blog-theme")).toBe("light");
    });

    it("should be in dark mode when there is no theme in the storage source and the os theme of the user is dark", async () => {
      const { store, inMemoryStorage } = setUp({
        inMemoryMatchMedia: buildInMemoryMatchMedia(false),
      });

      await store.dispatch(getUserTheme());

      expect(themeSelector(store.getState())).toBe(false);
      expect(inMemoryStorage.getItem("blog-theme")).toBe("dark");
    });

    it("should be in light mode when there is no theme in the storage source and the os theme of the user is light", async () => {
      const { store, inMemoryStorage } = setUp({
        preloadedState: {
          ui: {
            searchTerms: "",
            isLightMode: false,
          },
        },
        inMemoryMatchMedia: buildInMemoryMatchMedia(),
      });

      await store.dispatch(getUserTheme());

      expect(themeSelector(store.getState())).toBe(true);
      expect(inMemoryStorage.getItem("blog-theme")).toBe("light");
    });
  });

  describe("toggleUserTheme", () => {
    it("should toggle the theme to dark mode when it is in light mode initially", async () => {
      const { store, inMemoryStorage } = setUp({});

      await store.dispatch(toggleUserTheme());

      expect(themeSelector(store.getState())).toBe(false);
      expect(inMemoryStorage.getItem("blog-theme")).toBe("dark");
    });

    it("should toggle the theme to light mode when it is in dark mode initially", async () => {
      const { store, inMemoryStorage } = setUp({
        preloadedState: {
          ui: {
            searchTerms: "",
            isLightMode: false,
          },
        },
      });

      await store.dispatch(toggleUserTheme());

      expect(themeSelector(store.getState())).toBe(true);
      expect(inMemoryStorage.getItem("blog-theme")).toBe("light");
    });
  });
});
