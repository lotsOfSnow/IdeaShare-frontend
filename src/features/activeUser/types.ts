import * as actions from "./constants";
import { ActiveUser } from "./models";

interface StartLoadingActiveUserAction {
  type: typeof actions.ACTIVE_USER_LOADING_STARTED;
}

interface ActiveUserLoadedAction {
  type: typeof actions.ACTIVE_USER_LOADED;
  payload: ActiveUser;
}

interface ActiveUserLoadingFailedAction {
  type: typeof actions.ACTIVE_USER_LOADING_FAILED;
}

interface FetchActiveUserLikedArticlesStartedAction {
  type: typeof actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_STARTED;
}

interface FetchActiveUserLikedArticlesSuccessAction {
  type: typeof actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_SUCCESS;
  payload: number[];
}

interface FetchActiveUserLikedArticlesFailureAction {
  type: typeof actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_FAILURE;
}

interface ClearActiveUserAction {
  type: typeof actions.CLEAR_ACTIVE_USER;
}

export type ActiveUserActions =
  | StartLoadingActiveUserAction
  | ActiveUserLoadedAction
  | ActiveUserLoadingFailedAction
  | FetchActiveUserLikedArticlesStartedAction
  | FetchActiveUserLikedArticlesSuccessAction
  | FetchActiveUserLikedArticlesFailureAction
  | ClearActiveUserAction;
