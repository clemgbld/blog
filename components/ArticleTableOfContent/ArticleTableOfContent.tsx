"use client";
import { Link } from "react-scroll";
import { Article } from "../../core/backend/articles/entities/articles";
import { buildTableOfContent } from "../../core/frontend/articles/build-table-of-content/build-table-of-content";
import classNames from "./ArticleTableOfContent.module.scss";

const ArticleTableOfContent = ({ article }: { article: Article }) => {
  return (
    <div>
      <h2 className={classNames.content__title}>Content:</h2>
      <div className={classNames.content}>
        {buildTableOfContent(article).map((link) => (
          <Link
            className={classNames.content__link}
            key={link}
            to={link}
            smooth
            duration={300}
          >
            {`- ${link}`}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleTableOfContent;
