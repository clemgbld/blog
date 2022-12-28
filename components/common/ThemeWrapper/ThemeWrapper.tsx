"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../core/frontend/UI/selectors/ui-selectors";

type ThemeWrapperProps = {
  children: React.ReactNode;
};

const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => {
  const isLightMode = useSelector(themeSelector);

  const className = isLightMode ? "light" : "dark";

  console.log(isLightMode);
  return <div className={className}>{children}</div>;
};

export default ThemeWrapper;
