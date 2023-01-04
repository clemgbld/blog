import { getArticle } from "./get-article";

const Head = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticle(id);
  return (
    <>
      <title>{article.title}</title>
    </>
  );
};

export default Head;
