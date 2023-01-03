import { retrievePublishedArticles } from "../core/backend/articles/use-cases/retrieve-published-articles";
import { buildArticlesRepository } from "../infrastructure/backend/db/build-articles-repository";
import Home from "../components/Home/Home";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const HomePage = async () => {
  const articlesRepository = await buildArticlesRepository();

  const articles = await retrievePublishedArticles(articlesRepository);

  return <Home articles={articles} />;
};

export default HomePage;
