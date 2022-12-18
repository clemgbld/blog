const throwArticleError = (params: string) => {
  throw new Error(`An article must have ${params}`);
};

export const articleValidation = ({
  id,
  title,
  content,
  date,
}: {
  id?: string;
  title?: string;
  content: Record<string, any>[];
  date?: number;
}) => {
  if (!id) throwArticleError("an id");

  if (content.length === 0) throwArticleError("a content");

  if (!title) throwArticleError("a title");

  if (!date) throwArticleError("a date");
};
