import { getArticle } from "./get-article";
import { selectFirstImg } from "../../../core/frontend/articles/selectors/select-first-img/select-first-img";

const Head = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticle(id);
  const { src } = selectFirstImg(article.content);

  return (
    <>
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={article.summary} />
      <meta property="og:title" content={article.title} />
      <meta property="og:image" content={src} />
      <meta property="og:description" content={article.summary} />
      <meta
        property="og:url"
        content={`https://blog-clement-gombauld.vercel.app/article/${article.id}`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/logo192.webp" />
      <link rel="manifest" href="/manifest.json" />
      <title>{article.title}</title>
    </>
  );
};

export default Head;
