"use client";
import { FC } from "react";
import { Article } from "../core/backend/articles/entities/articles";

type HomeProps = {
  articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
  return <div>Home</div>;
};

export default Home;
