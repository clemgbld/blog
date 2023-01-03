import { retrievePublishedArticle } from "../../../core/backend/articles/use-cases/retrieve-published-article";
import { buildArticlesRepository } from "../../../infrastructure/backend/db/build-articles-repository";

const Head = async ({ params: { id } }: { params: { id: string } }) => {
  const articlesRepository = await buildArticlesRepository();

  const article = await retrievePublishedArticle({
    articlesRepository,
    id,
  });

  return (
    <>
      <title>{article.title}</title>
    </>
  );
};

export default Head;
