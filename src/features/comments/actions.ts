/* eslint-disable import/prefer-default-export */
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/index";
import * as webapi from "../../webapi";
import { tokenConfig } from "../auth/actions";
import * as actions from "./constants";

export const fetchArticleComments = (
  articleId: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch({ type: actions.FETCH_COMMENTS_STARTED });
  const endpoint = webapi.getArticleComments(articleId);

  const response = await fetch(endpoint.route, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();
    dispatch({ type: actions.FETCH_COMMENTS_SUCCESS, payload: result });
  } else {
    try {
      const result = await response.json();
      dispatch({
        type: actions.FETCH_COMMENTS_FAILURE,
        payload: result.errors,
      });
    } catch (err) {
      dispatch({ type: actions.FETCH_COMMENTS_FAILURE, payload: err });
    }
  }
};

export const fetchCommentsForUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({ type: actions.FETCH_COMMENTS_STARTED });
  const { route, method } = webapi.getCommentsForUser();

  const response = await fetch(route, {
    method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();
    dispatch({ type: actions.FETCH_COMMENTS_SUCCESS, payload: result });
  } else {
    try {
      const result = await response.json();
      dispatch({
        type: actions.FETCH_COMMENTS_FAILURE,
        payload: result.errors,
      });
    } catch (err) {
      dispatch({ type: actions.FETCH_COMMENTS_FAILURE, payload: err });
    }
  }
};
