"use client";
import React from "react";
import { renderContent } from "../../render/render-content";
import classNames from "./ArticleContent.module.scss";

const ArticleContent = ({ content }: { content: any }) => {
  return <div className={classNames.content}>{renderContent(content)}</div>;
};

export default ArticleContent;
