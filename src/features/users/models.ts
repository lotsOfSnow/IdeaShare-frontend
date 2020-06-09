import { Loadable } from "../../types/loadable";
import { Nullable } from "../../types/nullable";

export type User = Loadable &
  UserBase & {
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    isRealNameHidden: Nullable<boolean>;
    registrationDate: Nullable<string>;
    description: Nullable<string>;
    articlesWritten: Nullable<number>;
    likesReceived: Nullable<number>;
  };

export type UserBase = {
  id: Nullable<string>;
  userName: Nullable<string>;
  profilePicture: Nullable<string>;
};
