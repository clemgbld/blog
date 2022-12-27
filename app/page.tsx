import { retrievePublishedArticles } from "./core/backend/articles/use-cases/retrieve-published-articles";
import { buildInMemoryArticlesRepository } from "./infrastructure/backend/articles/in-memory-articles-repository";
import Home from "./components/Home/Home";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const HomePage = async () => {
  const articlesRepository = buildInMemoryArticlesRepository();

  const articles = await retrievePublishedArticles(articlesRepository);

  return <Home articles={articles} />;
};

export default HomePage;
