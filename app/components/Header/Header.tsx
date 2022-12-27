"use client";
import { FC, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/frontend/store";
import { updateSearchTerms } from "../../core/frontend/UI/use-cases/search";
import {
  getUserTheme,
  toggleUserTheme,
} from "../../core/frontend/UI/use-cases/theme";

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
        <nav>
          {isInHomePage(pathname) && (
            <input
              placeholder="search"
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
