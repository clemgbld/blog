"use client";
import React from "react";
import { Article } from "../../core/backend/articles/entities/articles";
import { renderContent } from "../../render/render-content";
import classNames from "./Article.module.scss";

const Article = ({ article }: { article: Article }) => {
  return (
    <div className={classNames.article}>{renderContent(article.content)}</div>
  );
};

export default Article;
