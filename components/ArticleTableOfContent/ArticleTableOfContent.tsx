import { Link } from "react-scroll";
import { buildTableOfContent } from "../../core/frontend/articles/build-table-of-content/build-table-of-content";
import classNames from "./ArticleTableOfContent.module.scss";

const ArticleTableOfContent = ({ content }: any) => {
  return (
    <div>
      <h2>Table of Content:</h2>
      {buildTableOfContent(content).map((link) => (
        <Link
          className={classNames.link}
          key={link}
          to={link}
          smooth
          duration={300}
        >
          {`- ${link}`}
        </Link>
      ))}
    </div>
  );
};

export default ArticleTableOfContent;
