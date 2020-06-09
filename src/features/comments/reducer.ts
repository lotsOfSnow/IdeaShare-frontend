import * as actions from "./constants";
import { Comments } from "./models";
import { CommentsActions } from "./types";

export type CommentsState = Readonly<Comments>;

const initialState: CommentsState = {
  isLoading: false,
  isLoaded: true,
  list: [],
  loadingError: false,
};

export default function commentsReducer(
  state = initialState,
  action: CommentsActions
): CommentsState {
  switch (action.type) {
    case actions.FETCH_COMMENTS_STARTED: {
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
        loadingError: false,
      };
    }
    case actions.FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        list: action.payload,
        loadingError: false,
      };
    }
    case actions.FETCH_COMMENTS_FAILURE: {
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        list: [],
        loadingError: true,
      };
    }
    default:
      return state;
  }
}
