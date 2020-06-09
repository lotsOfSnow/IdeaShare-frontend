import * as actions from "./constants";

interface FetchCommentsStartedAction {
  type: typeof actions.FETCH_COMMENTS_STARTED;
}

interface FetchCommentsSuccessAction {
  type: typeof actions.FETCH_COMMENTS_SUCCESS;
  payload: any;
}

interface FetchCommentsFailureAction {
  type: typeof actions.FETCH_COMMENTS_FAILURE;
  payload: Comment[];
}

export type CommentsActions =
  | FetchCommentsStartedAction
  | FetchCommentsSuccessAction
  | FetchCommentsFailureAction;
