import { FC, SetStateAction } from "react";

import { calcNumPages } from "../../../core/frontend/articles/pagination/pagination";
import { allArticlesFormatted } from "../../../core/frontend/articles/formatting/format-articles";
import classNames from "./PaginationFooter.module.scss";

type PaginationFooterProps = {
  currentPage: number;
  articlesPerPage: number;
  articles: ReturnType<typeof allArticlesFormatted>;
  setCurrentPage: (value: SetStateAction<number>) => void;
};

const PaginationFooter: FC<PaginationFooterProps> = ({
  currentPage,
  articlesPerPage,
  articles,
  setCurrentPage,
}) => (
  <div>
    {calcNumPages(articlesPerPage, articles).length > 1 && (
      <div className={classNames["page__container"]}>
        {calcNumPages(articlesPerPage, articles).map((numPage) => (
          <button
            className={
              numPage === currentPage
                ? `${classNames["page__button"]} ${classNames["page__button--active"]}`
                : classNames["page__button"]
            }
            onClick={() => setCurrentPage(numPage)}
            key={numPage}
          >
            {numPage}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default PaginationFooter;
