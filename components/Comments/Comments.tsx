"use client";
import Giscus from "@giscus/react";

const id = "inject-comments";

const Comments = () => {
  return (
    <Giscus
      id={id}
      repo="clemgbld/blog-comments"
      repoId="584378428"
      category="Announcements"
      categoryId="DIC_kwDOEWBvEs4COl22"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;
