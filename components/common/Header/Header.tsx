"use client";
import { FC, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/frontend/store";
import { updateSearchTerms } from "../../../core/frontend/UI/use-cases/search";
import {
  getUserTheme,
  toggleUserTheme,
} from "../../../core/frontend/UI/use-cases/theme";
import classNames from "./Header.module.scss";
import Link from "next/link";

type HeaderProps = {
  children: React.ReactNode;
};

const isInHomePage = (pathname: string | null) => pathname === "/";

const Header: FC<HeaderProps> = ({ children }) => {
  const pathname = usePathname();

  const searchTerms = useSelector(
    ({ ui: { searchTerms } }: RootState) => searchTerms
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTheme());
  }, [dispatch]);

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

          {isInHomePage(pathname) && (
            <input
              placeholder="search"
              className={classNames.nav_search}
              type="text"
              value={searchTerms}
              onChange={({ target: { value } }) =>
                dispatch(updateSearchTerms(value))
              }
            />
          )}
          <button
            onClick={() => dispatch(toggleUserTheme())}
            data-testid="switch-theme"
          >
            switch theme
          </button>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Header;
