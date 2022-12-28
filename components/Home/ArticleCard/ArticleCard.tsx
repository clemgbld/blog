/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../core/frontend/UI/selectors/ui-selectors";
import { FormattedArticle } from "../../../core/frontend/articles/formatting/format-articles";

import { selectFirstImg } from "../../../core/frontend/articles/select-first-img/select-first-img";
import classNames from "./ArticleCard.module.scss";
import { AiOutlineCalendar, AiOutlineCoffee } from "react-icons/ai";
import { MdOutlineTopic } from "react-icons/md";

type ArticleCardProps = {
  article: FormattedArticle;
};

const ArticleCard: FC<ArticleCardProps> = ({
  article: { id, content, title, summary, date, timeToRead, topic },
}) => {
  const isLightMode = useSelector(themeSelector);

  const { src, alt } = selectFirstImg(content);
  return (
    <div data-testid="article" key={id}>
      <Link href={`/article/${id}`} className={classNames.link}>
        <figure className={classNames.card}>
          <div className={classNames["card__img--container"]}>
            <img className={classNames.card__img} src={src} alt={alt} />
          </div>
          <figcaption>
            <h2 className={classNames.card__title}>{title}</h2>
            <div className={classNames["card__tag--container"]}>
              <div className={classNames.card__tag}>
                <AiOutlineCalendar />
                <span>{date}</span>
              </div>
              <div className={classNames.card__tag}>
                <AiOutlineCoffee />
                <span>{timeToRead}</span>
              </div>
              {topic && (
                <div className={classNames.card__tag}>
                  <MdOutlineTopic />
                  <span>{topic}</span>
                </div>
              )}
            </div>
            {summary && <p className={classNames.card__summary}>{summary}</p>}
          </figcaption>
        </figure>
      </Link>
    </div>
  );
};

export default ArticleCard;
