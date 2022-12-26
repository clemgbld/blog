import { createStore } from "../../../store";
import { buildInMemoryStorage } from "../../../../../infrastructure/frontend/storage-service/in-memory-storage";
import { buildStorageService } from "../../../../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../../../../infrastructure/frontend/os-theme-service/os-theme-service";
import { buildInMemoryMatchMedia } from "../../../../../infrastructure/frontend/os-theme-service/in-memory-match-media";
import { getUserTheme } from "../theme";

describe("theme feature", () => {
  const setUp = ({
    existingStorage = {},
    existingMatchMedia = true,
  }: {
    existingStorage?: Record<string, string>;
    existingMatchMedia?: boolean;
  }) => {
    const inMemoryStorage = buildInMemoryStorage(existingStorage);
    const inMemoryMatchMedia = buildInMemoryMatchMedia(existingMatchMedia);
    const storageService = buildStorageService(inMemoryStorage);
    const osThemeService = buildOsThemeService(inMemoryMatchMedia);
    const store = createStore({
      services: {
        storageService,
        osThemeService,
      },
    });

    return {
      store,
      inMemoryStorage,
    };
  };
  it("should have a light mode set to true initially", () => {
    const store = createStore({});
    expect(store.getState().ui.isLightMode).toBe(true);
  });

  it("should be in dark mode when this mode is already in the storage", async () => {
    const { store } = setUp({ existingStorage: { "blog-theme": "dark" } });
    await store.dispatch(getUserTheme());

    expect(store.getState().ui.isLightMode).toBe(false);
  });

  it("should be in light mode when this mode is already in the storage", async () => {
    const inMemoryStorage = buildInMemoryStorage({
      "blog-theme": "light",
    });
    const inMemoryMatchMedia = buildInMemoryMatchMedia();
    const storageService = buildStorageService(inMemoryStorage);
    const osThemeService = buildOsThemeService(inMemoryMatchMedia);
    const store = createStore({
      services: {
        storageService,
        osThemeService,
      },
      preloadedState: {
        ui: {
          searchTerms: "",
          isLightMode: false,
        },
      },
    });

    await store.dispatch(getUserTheme());

    expect(store.getState().ui.isLightMode).toBe(true);
  });
});
