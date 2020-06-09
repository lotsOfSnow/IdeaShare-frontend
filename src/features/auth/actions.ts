import { Action, CombinedState } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/index";
import * as webapi from "../../webapi";
import { loadUser } from "../activeUser/actions";
import * as actions from "./constants";
import { Credentials } from "./models";

export const tokenConfig = (getState: CombinedState<RootState>) => {
  const { token } = getState.auth;

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/javascript",
  };
};

export const logIn = ({
  email,
  password,
}: Credentials): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({ type: actions.LOGIN_STARTED });
  const endpoint = webapi.createSession();

  const response = await fetch(endpoint.route, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const result = await response.json();
    dispatch({ type: actions.LOGIN_SUCCESS, payload: result.token });
    dispatch(loadUser());
  } else {
    try {
      const result = await response.json();
      dispatch({ type: actions.LOGIN_FAIL, payload: result.errors });
    } catch (err) {
      dispatch({ type: actions.LOGIN_FAIL, payload: err });
    }
  }
};
