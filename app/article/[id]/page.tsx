import { getArticle } from "./get-article";
import ArticleContent from "../../../components/ArticleContent/ArticleContent";
import ArticleDetails from "../../../components/ArticleDetails/ArticleDetails";
import ArticleTableOfContent from "../../../components/ArticleTableOfContent/ArticleTableOfContent";
import Comments from "../../../components/Comments/Comments";

const ArticlePage = async ({ params: { id } }: { params: { id: string } }) => {
  const article = await getArticle(id);
  return (
    <div className="page">
      <ArticleDetails
        date={article.date}
        topic={article.topic}
        timeToRead={article.timeToRead}
      />
      <ArticleTableOfContent article={article} />
      <ArticleContent content={article.content} />
      <Comments />
    </div>
  );
};

export default ArticlePage;
