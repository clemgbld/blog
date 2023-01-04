"use client";
import Giscus from "@giscus/react";

const id = "inject-comments";

const Comments = () => {
  return (
    <Giscus
      id={id}
      repo="clemgbld/blog-comments"
      repoId="R_kgDOItToPA"
      category="Announcements"
      categoryId="DIC_kwDOItToPM4CTZzg"
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
