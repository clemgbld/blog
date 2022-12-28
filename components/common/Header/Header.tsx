"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import classNames from "./Header.module.scss";
import Link from "next/link";
import { useSearchStore } from "../../../hooks/useSearchStore";

type HeaderProps = {
  children: React.ReactNode;
};

const isInHomePage = (pathname: string | null) => pathname === "/";

const Header: FC<HeaderProps> = ({ children }) => {
  const pathname = usePathname();

  const { searchTerms, setSearchTerms } = useSearchStore((state) => state);

  return (
    <div>
      <header>
        <nav className={classNames.nav}>
          <Link href="/" className={classNames["nav_img_container"]}>
            <Image
              className={classNames.nav_img}
              src="/app-logo.png"
              alt="logo app"
              width={500}
              height={500}
            />
          </Link>

          {isInHomePage(pathname) ? (
            <input
              placeholder="search"
              className={classNames.nav_search}
              type="text"
              value={searchTerms}
              onChange={({ target: { value } }) => setSearchTerms(value)}
            />
          ) : (
            <h2 className={classNames.nav_title}>Clement&apos;s dev blog</h2>
          )}

          <div>Portfolio</div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Header;
