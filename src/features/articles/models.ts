import { Loadable } from "../../types/loadable";
import { Nullable } from "../../types/nullable";
import { User } from "../users/models";

export type Article = Loadable &
  ArticleBase & {
    body: Nullable<string>;
  };

export type ArticlePreview = Loadable &
  ArticleBase & {
    author: Nullable<string>;
  };

export type ArticleBase = {
  id: Nullable<number>;
  author: Nullable<User>;
  title: Nullable<string>;
  description: Nullable<string>;
  tags: Nullable<string[]>;
  creationDate: Nullable<string>;
  featuredImage: Nullable<string>;
};

export type OrderedBy = "Title" | "Date";

export type Order = "Ascending" | "Descending";
