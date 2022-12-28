"use client";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { createStore } from "../../../core/frontend/store";
import { buildStorageService } from "../../../infrastructure/frontend/storage-service/storage-service";
import { buildOsThemeService } from "../../../infrastructure/frontend/os-theme-service/os-theme-service";

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  const store = createStore({
    services: {
      storageService: buildStorageService(sessionStorage),
      osThemeService: buildOsThemeService(window.matchMedia),
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
