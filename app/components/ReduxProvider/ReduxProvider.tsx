"use client";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { createStore } from "../../core/frontend/store";

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  const store = createStore({});

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
