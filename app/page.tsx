import { retrievePublishedArticles } from "./core/backend/articles/use-cases/retrieve-published-articles";
import { buildInMemoryArticlesRepository } from "./infrastructure/backend/articles/in-memory-articles-repository";
import Home from "./components/home/Home";

const HomePage = async () => {
  const articlesRepository = buildInMemoryArticlesRepository();

  const articles = await retrievePublishedArticles(articlesRepository);

  return <Home articles={articles} />;
};

export default HomePage;
