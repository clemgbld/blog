import React from "react";
import classNames from "./Tag.module.scss";

const Tag = ({
  className,
  label,
  onClick,
}: {
  className: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={`${classNames.tag} ${className}`}>
      {label}
    </button>
  );
};

export default Tag;
