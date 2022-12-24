"use client";
import { FC } from "react";
import { Article } from "../../core/backend/articles/entities/articles";
import Link from "next/link";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles yet!</p>
      ) : (
        articles.map(({ id }) => (
          <div key={id}>
            <Link href={`/article/${id}`}>something</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
