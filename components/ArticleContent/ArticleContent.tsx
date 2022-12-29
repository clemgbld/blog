"use client";
import React from "react";
import { renderContent } from "../../render/render-content";

const ArticleContent = ({ content }: { content: any }) => {
  return <div>{renderContent(content)}</div>;
};

export default ArticleContent;
