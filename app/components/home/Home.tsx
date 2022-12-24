"use client";
import { FC } from "react";
import { Article } from "../../core/backend/articles/entities/articles";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "./ArticleCard/ArticleCard";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles yet!</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
};

export default Home;
