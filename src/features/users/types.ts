import * as actions from "./constants";
import { User } from "./models";

interface FetchUserStartedAction {
  type: typeof actions.FETCH_USER_STARTED;
}

interface FetchUserSuccessAction {
  type: typeof actions.FETCH_USER_SUCCESS;
  payload: User;
}

interface FetchUserFailureAction {
  type: typeof actions.FETCH_USER_FAILURE;
}

export type UserActions =
  | FetchUserStartedAction
  | FetchUserSuccessAction
  | FetchUserFailureAction;
