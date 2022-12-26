import { createStore } from "../../../store";
import { buildInMemoryStorage } from "../../../../../infrastructure/frontend/storage-service/in-memory-storage";
import { buildStorageService } from "../../../../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../../../../infrastructure/frontend/os-theme-service/os-theme-service";

describe("theme feature", () => {
  it("should have a light mode set to true initially", () => {
    const store = createStore({});
    expect(store.getState().ui.isLightMode).toBe(true);
  });

  it.skip("should be in ligth mode when this mode is already in the storage", async () => {
    const inMemoryStorage = buildInMemoryStorage({
      "blog-theme": "light",
    });
    const storageService = buildStorageService(inMemoryStorage);
    const osThemeService = buildOsThemeService();
    const store = createStore({
      services: {
        storageService,
        osThemeService,
      },
    });
  });
});
