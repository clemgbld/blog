"use client";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/frontend/store";
import { updateSearchTerms } from "../../core/frontend/UI/use-cases/search";
import { getUserTheme } from "../../core/frontend/UI/use-cases/theme";

type HeaderProps = {
  children: React.ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
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
          <input
            placeholder="search"
            type="text"
            value={searchTerms}
            onChange={({ target: { value } }) =>
              dispatch(updateSearchTerms(value))
            }
          />
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Header;
