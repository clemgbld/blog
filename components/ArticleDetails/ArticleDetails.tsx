import { formatDateDDMMYYYY } from "../../core/frontend/utils/date/format-date";
import { AiOutlineCalendar, AiOutlineCoffee } from "react-icons/ai";
import { MdOutlineTopic } from "react-icons/md";
import classNames from "./ArticleDetails.module.scss";

const ArticleDetails = ({
  date,
  topic,
  timeToRead,
}: {
  date: number;
  topic?: string | null;
  timeToRead: string;
}) => (
  <div className={classNames.details}>
    <div className={classNames["details__tags-container"]}>
      <AiOutlineCalendar />
      <span>{formatDateDDMMYYYY(new Date(date))}</span>
    </div>
    <div className={classNames["details__tags-container"]}>
      <AiOutlineCoffee />
      <span>{timeToRead}</span>
    </div>
    {topic && (
      <div className={classNames["details__tags-container"]}>
        <MdOutlineTopic />
        <span>{topic}</span>
      </div>
    )}
  </div>
);

export default ArticleDetails;
