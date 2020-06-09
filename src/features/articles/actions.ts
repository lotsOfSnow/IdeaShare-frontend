import { History } from "history";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { getPaginationPagesCount } from "../../utilities";
import * as webapi from "../../webapi";
import { tokenConfig } from "../auth/actions";
import {
  FETCH_ARTICLE_FAILURE,
  FETCH_ARTICLE_STARTED,
  FETCH_ARTICLE_SUCCESS,
  FETCH_PREVIEW_LIST_FAILURE,
  FETCH_PREVIEW_LIST_STARTED,
  FETCH_PREVIEW_LIST_SUCCESS,
  FETCH_SEARCH_PREVIEW_LIST_FAILURE,
  FETCH_SEARCH_PREVIEW_LIST_STARTED,
  FETCH_SEARCH_PREVIEW_LIST_SUCCESS,
  SET_ARTICLES_PAGE,
  SET_ARTICLES_PER_PAGE,
  SET_ORDER,
  SET_ORDERED_BY,
  SET_WITH_TAG,
} from "./constants";
import { Order, OrderedBy } from "./models";

// eslint-disable-next-line import/prefer-default-export
export const fetchArticle = (
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCH_ARTICLE_STARTED });

  const endpoint = webapi.getArticle(id);

  const response = await fetch(endpoint.route, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();
    dispatch({ type: FETCH_ARTICLE_SUCCESS, payload: result });
  } else {
    dispatch({ type: FETCH_ARTICLE_FAILURE });
  }
};

export const fetchPreviewList = (
  username?: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  if (username === null) {
    throw new Error("Can't fetch for a null username");
  }
  dispatch({ type: FETCH_PREVIEW_LIST_STARTED });

  const {
    page,
    perPage,
    order,
    orderedBy,
    withTag,
  } = getState().articles.config;

  const sort =
    order === "Descending"
      ? `-${orderedBy.toLowerCase()}`
      : orderedBy.toLowerCase();

  const endpoint = username
    ? webapi.getArticlesByUser(username)
    : webapi.getArticles(
        "preview",
        page,
        perPage,
        sort,
        undefined,
        withTag === null ? undefined : withTag
      );

  const response = await fetch(endpoint.route, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();

    const totalCount = response.headers.get("x-total-count");
    dispatch({
      type: FETCH_PREVIEW_LIST_SUCCESS,
      payload: { list: result, totalCount: parseInt(totalCount as string, 0) },
    });
  } else {
    try {
      const result = await response.json();
      dispatch({ type: FETCH_PREVIEW_LIST_FAILURE, payload: result });
    } catch (err) {
      dispatch({ type: FETCH_PREVIEW_LIST_FAILURE, payload: err });
    }
  }
};

export const fetchSearchPreviewList = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({ type: FETCH_SEARCH_PREVIEW_LIST_STARTED });

  const { filterTitle } = getState().articles.search;
  const endpoint = webapi.getArticles("preview");

  const response = await fetch(`${endpoint.route}&title=${filterTitle}`, {
    method: endpoint.method,
    headers: tokenConfig(getState()),
  });

  if (response.ok) {
    const result = await response.json();
    const totalCount = response.headers.get("x-total-count");
    dispatch({
      type: FETCH_SEARCH_PREVIEW_LIST_SUCCESS,
      payload: { list: result, totalCount: parseInt(totalCount as string, 0) },
    });
  } else {
    try {
      const result = await response.json();
      dispatch({ type: FETCH_SEARCH_PREVIEW_LIST_FAILURE, payload: result });
    } catch (err) {
      dispatch({ type: FETCH_SEARCH_PREVIEW_LIST_FAILURE, payload: err });
    }
  }
};

export const setPage = (
  value: number,
  history: History
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  const currentValue = getState().articles.config.page;
  if (currentValue === value) {
    return;
  }

  dispatch({ type: SET_ARTICLES_PAGE, payload: value });
  const { withTag } = getState().articles.config;
  let query = `?page=${value}`;
  if (withTag !== null) {
    query = query.concat(`&tag=${withTag}`);
  }

  history.push(query);
};

export const setWithTag = (
  tag: string,
  history: History
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  dispatch({ type: SET_WITH_TAG, payload: tag });
  const { page } = getState().articles.config;
  history.push(`?page=${page}&tag=${tag}`);
};

export const clearWithTag = (
  history: History
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  dispatch({ type: SET_WITH_TAG, payload: null });
};

export const setArticlesPerPage = (
  value: number,
  history: History
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  const { page, perPage: currentValue } = getState().articles.config;
  const { totalCount } = getState().articles.previews;

  if (currentValue === value) {
    return;
  }

  dispatch({ type: SET_ARTICLES_PER_PAGE, payload: value });

  const newPerPage = getState().articles.config.perPage;

  const newIndex = newPerPage * (page - 1);
  if (newIndex > totalCount) {
    const pagesCount = getPaginationPagesCount(newPerPage, totalCount);
    dispatch(setPage(pagesCount, history));
    history.push(`?page=${pagesCount}`);
  }
};

export const setOrderedBy = (
  value: OrderedBy
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  const { orderedBy: currentValue } = getState().articles.config;

  if (currentValue === value) {
    return;
  }

  dispatch({ type: SET_ORDERED_BY, payload: value });
};

export const setOrder = (
  value: Order
): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch,
  getState
) => {
  const { order: currentValue } = getState().articles.config;

  if (currentValue === value) {
    return;
  }

  dispatch({ type: SET_ORDER, payload: value });
};
