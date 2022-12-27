import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../../core/frontend/store";
import { buildInMemoryStorage } from "../../../infrastructure/frontend/storage-service/in-memory-storage";
import { buildStorageService } from "../../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../../infrastructure/frontend/os-theme-service/os-theme-service";
import Header from "../Header";

describe("Header", () => {
  it("should set the user theme to light initially and update the storage source", () => {
    const storage = buildInMemoryStorage();
    const storageService = buildStorageService(storage);
    const osThemeService = buildOsThemeService();
    const store = createStore({
      services: {
        storageService,
        osThemeService,
      },
    });

    render(
      <Provider store={store}>
        <Header>
          <div />
        </Header>
      </Provider>
    );

    expect(storage.getItem("blog-theme")).toBe("light");
  });
});
