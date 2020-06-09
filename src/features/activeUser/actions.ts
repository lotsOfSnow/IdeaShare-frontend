import Cookies from "js-cookie";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import * as webapi from "../../webapi";
import { ArticlePreview } from "../articles/models";
import { tokenConfig } from "../auth/actions";
import {
  AUTH_CHECK_STARTED,
  AUTH_CHECK_SUCCESS,
  AUTH_FAILED,
} from "../auth/constants";
import * as actions from "./constants";

const getArticlesIds = (articles: ArticlePreview[]): number[] => {
  return articles.map(x => x.id as number);
};

export const loadUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({ type: AUTH_CHECK_STARTED });
  dispatch({ type: actions.ACTIVE_USER_LOADING_STARTED });
  dispatch({ type: actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_STARTED });

  const endpoint = webapi.getAuthenticatedUserInfo();

  const response = await fetch(endpoint.route, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();
    dispatch({ type: AUTH_CHECK_SUCCESS, payload: Cookies.get("token") });

    dispatch({ type: actions.ACTIVE_USER_LOADED, payload: result.user });

    dispatch({
      type: actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_SUCCESS,
      payload: getArticlesIds(result.likedArticles),
    });
  } else {
    dispatch({ type: AUTH_FAILED, payload: null });
    dispatch({ type: actions.ACTIVE_USER_LOADING_FAILED });
    dispatch({ type: actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_FAILURE });
  }
};

export const loadLikedArticlesIds = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({ type: actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_STARTED });

  const endpoint = webapi.getArticlesLikedByUser(
    getState().activeUser.user.userName as string
  );

  const response = await fetch(`${endpoint.route}`, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();
    dispatch({
      type: actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_SUCCESS,
      payload: getArticlesIds(result),
    });
  } else {
    dispatch({ type: actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_FAILURE });
  }
};
