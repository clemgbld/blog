import { FC } from "react";

type HeaderProps = {
  children: React.ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Header;
