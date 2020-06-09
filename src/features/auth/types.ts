import * as actions from "./constants";

interface LoginStartedAction {
  type: typeof actions.LOGIN_STARTED;
}

interface LoginSuccessAction {
  type: typeof actions.LOGIN_SUCCESS;
  payload: string;
}

interface LoginFailAction {
  type: typeof actions.LOGIN_FAIL;
  payload: { [name: string]: string };
}

interface LogoutSuccessAction {
  type: typeof actions.LOGOUT_SUCCESS;
}

interface AuthFailedAction {
  type: typeof actions.AUTH_FAILED;
  payload: { [name: string]: string };
}

interface AuthCheckStartedAction {
  type: typeof actions.AUTH_CHECK_STARTED;
}

interface AuthCheckSuccessAction {
  type: typeof actions.AUTH_CHECK_SUCCESS;
}

export type AuthActions =
  | LoginStartedAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutSuccessAction
  | AuthFailedAction
  | AuthCheckStartedAction
  | AuthCheckSuccessAction;
