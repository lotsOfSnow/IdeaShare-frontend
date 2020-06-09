import { Nullable } from "../../types/nullable";
import { User } from "../users/models";

export type ActiveUser = User & {
  email: Nullable<string>;
};
