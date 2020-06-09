import { Loadable } from "../../types/loadable";
import { UserBase } from "../users/models";

export type Comment = {
  author: UserBase;
  body: string;
  timeSent: string;
  id: number;
  isAccepted: boolean;
  isRejected: boolean;
  article: {
    id: number;
    author: string;
  };
};

export type Comments = Loadable & {
  list: Comment[];
};
