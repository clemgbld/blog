import { FC, ReactNode } from "react";
import classNames from "./Footer.module.scss";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiCodewars } from "react-icons/si";
import Link from "next/link";

type FooterProps = {
  children: ReactNode;
};

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <>
      {children}
      <footer className={classNames.footer}>
        <div className={classNames.footer__box}>
          <Link
            className={classNames.footer__link}
            href="https://github.com/clemgbld"
          >
            <FiGithub className={classNames.footer__icon} />
          </Link>
          <Link
            className={classNames.footer__link}
            href="https://www.codewars.com/users/clemgbld/stats"
          >
            <SiCodewars className={classNames.footer__icon} />
          </Link>
          <Link
            className={classNames.footer__link}
            href="https://www.linkedin.com/in/cl%C3%A9ment-gombauld/"
          >
            <FiLinkedin className={classNames.footer__icon} />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
