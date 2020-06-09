import { Loadable } from "../../types/loadable";
import { Nullable } from "../../types/nullable";

export type Auth = Loadable & {
  token: Nullable<string> | undefined;
  isAuthenticated: boolean;
  errors: Nullable<{ [name: string]: string }>;
};

export type Credentials = {
  email: string;
  password: string;
};

export interface AuthError {
  [name: string]: string;
}
