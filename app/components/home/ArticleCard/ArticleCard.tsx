/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { FormattedArticle } from "../../../core/frontend/articles/formatting/format-articles";
import Link from "next/link";
import { selectFirstImg } from "../../../core/frontend/articles/select-first-img/select-first-img";

type ArticleCardProps = {
  article: FormattedArticle;
};

const ArticleCard: FC<ArticleCardProps> = ({
  article: { id, content, title, summary, date, timeToRead, topic },
}) => {
  const { src, alt } = selectFirstImg(content);
  return (
    <div key={id}>
      <Link href={`/article/${id}`}>
        <figure>
          <div>
            <img src={src} alt={alt} />
          </div>
          <figcaption>
            <h2>{title}</h2>
            <div>
              <div>
                <span>{date}</span>
              </div>
              <div>
                <span>{timeToRead}</span>
              </div>
              {topic && (
                <div>
                  <span>{topic}</span>
                </div>
              )}
            </div>
            {summary && <p>{summary}</p>}
          </figcaption>
        </figure>
      </Link>
    </div>
  );
};

export default ArticleCard;
