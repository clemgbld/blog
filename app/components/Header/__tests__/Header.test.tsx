import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "../../../core/frontend/store";
import { buildInMemoryStorage } from "../../../infrastructure/frontend/storage-service/in-memory-storage";
import { buildStorageService } from "../../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../../infrastructure/frontend/os-theme-service/os-theme-service";
import Header from "../Header";

describe("Header", () => {
  const renderHeader = () => {
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
    return { storage };
  };

  it("should set the user theme to light initially and update the storage source", () => {
    const { storage } = renderHeader();

    expect(storage.getItem("blog-theme")).toBe("light");
  });

  it("should should swich to dark mode when the theme switch is clicked", async () => {
    const { storage } = renderHeader();
    const switchBtn = screen.getByTestId("switch-theme");
    await userEvent.click(switchBtn);
    expect(storage.getItem("blog-theme")).toBe("dark");
  });
});
