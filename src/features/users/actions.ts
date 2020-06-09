import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/index";
import * as webapi from "../../webapi";
import { tokenConfig } from "../auth/actions";
import * as actions from "./constants";

// eslint-disable-next-line import/prefer-default-export
export const fetchUser = (
  username: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch({ type: actions.FETCH_USER_STARTED });
  const endpoint = webapi.getUser(username);

  const response = await fetch(endpoint.route, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.status === 200) {
    const result = await response.json();
    dispatch({ type: actions.FETCH_USER_SUCCESS, payload: result });
  } else {
    dispatch({ type: actions.FETCH_USER_FAILURE });
  }
};
