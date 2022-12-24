/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Article } from "../../../core/backend/articles/entities/articles";
import Link from "next/link";
import Image from "next/image";
import { selectFirstImg } from "../../../core/frontend/articles/select-first-img/select-first-img";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: FC<ArticleCardProps> = ({ article: { id, content } }) => {
  const { src, alt } = selectFirstImg(content);
  return (
    <div key={id}>
      <Link href={`/article/${id}`}>
        <div>
          <img src={src} alt={alt} width={500} height={500} />
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
