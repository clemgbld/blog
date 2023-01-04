import { getArticle } from "./get-article";

const Head = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticle(id);

  return (
    <>
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={article.summary} />
      <link rel="icon" href="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/logo192.webp" />
      <link rel="manifest" href="/manifest.json" />
      <title>{article.title}</title>
    </>
  );
};

export default Head;
