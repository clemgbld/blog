"use client";

import { useEffect } from "react";
import Tag from "../components/Home/Tag/Tag";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-centered">
      <div className="mg-top">
        <h1>| Something went wrong! |</h1>
        <Tag
          className=""
          label="Reset Error boundary"
          onClick={() => reset()}
        />
      </div>
    </div>
  );
}
