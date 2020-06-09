import { Nullable } from "../../types/nullable";
import * as actions from "./constants";
import { Article, ArticlePreview, Order, OrderedBy } from "./models";

interface FetchArticleStartedAction {
  type: typeof actions.FETCH_ARTICLE_STARTED;
}

interface FetchArticleSuccessAction {
  type: typeof actions.FETCH_ARTICLE_SUCCESS;
  payload: Article;
}

interface FetchArticleFailureAction {
  type: typeof actions.FETCH_ARTICLE_FAILURE;
}

interface FetchPreviewListStartedAction {
  type: typeof actions.FETCH_PREVIEW_LIST_STARTED;
}

interface FetchPreviewListSuccessAction {
  type: typeof actions.FETCH_PREVIEW_LIST_SUCCESS;
  payload: { list: ArticlePreview[]; totalCount: number };
}

interface FetchPreviewListFailureAction {
  type: typeof actions.FETCH_PREVIEW_LIST_FAILURE;
}

interface FetchSearchPreviewListStartedAction {
  type: typeof actions.FETCH_SEARCH_PREVIEW_LIST_STARTED;
}

interface FetchSearchPreviewListSuccessAction {
  type: typeof actions.FETCH_SEARCH_PREVIEW_LIST_SUCCESS;
  payload: { list: ArticlePreview[]; totalCount: number };
}

interface FetchSearchPreviewListFailureAction {
  type: typeof actions.FETCH_SEARCH_PREVIEW_LIST_FAILURE;
}

interface SetFilterTitleAction {
  type: typeof actions.SET_FILTER_TITLE;
  payload: Nullable<string>;
}

interface SetArticlesPageAction {
  type: typeof actions.SET_ARTICLES_PAGE;
  payload: number;
}

interface SetArticlesPerPageAction {
  type: typeof actions.SET_ARTICLES_PER_PAGE;
  payload: number;
}

interface SetOrderedByAction {
  type: typeof actions.SET_ORDERED_BY;
  payload: OrderedBy;
}

interface SetOrderAction {
  type: typeof actions.SET_ORDER;
  payload: Order;
}

interface SetWithTagAction {
  type: typeof actions.SET_WITH_TAG;
  payload: Nullable<string>;
}

export type ArticlesActions =
  | FetchArticleStartedAction
  | FetchArticleSuccessAction
  | FetchArticleFailureAction
  | FetchPreviewListStartedAction
  | FetchPreviewListSuccessAction
  | FetchPreviewListFailureAction
  | FetchSearchPreviewListStartedAction
  | FetchSearchPreviewListSuccessAction
  | FetchSearchPreviewListFailureAction
  | SetFilterTitleAction
  | SetArticlesPageAction
  | SetArticlesPerPageAction
  | SetOrderedByAction
  | SetOrderAction
  | SetWithTagAction;
