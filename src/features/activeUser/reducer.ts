import { combineReducers } from "redux";
import { Loadable } from "../../types/loadable";
import { Nullable } from "../../types/nullable";
import * as actions from "./constants";
import { ActiveUser } from "./models";
import { ActiveUserActions } from "./types";

export type ActiveUserState = Readonly<{
  user: ActiveUser;
  likedArticles: Loadable & {
    ids: Nullable<number[]>;
  };
}>;

const initialState: ActiveUserState = {
  user: {
    id: null,
    isLoading: false,
    isLoaded: false,
    loadingError: false,
    userName: null,
    email: null,
    firstName: null,
    lastName: null,
    isRealNameHidden: null,
    registrationDate: null,
    profilePicture: null,
    description: null,
    articlesWritten: null,
    likesReceived: null,
  },
  likedArticles: {
    isLoaded: false,
    isLoading: false,
    loadingError: false,
    ids: null,
  },
};

export default combineReducers<ActiveUserState, ActiveUserActions>({
  user: (state = initialState.user, action) => {
    switch (action.type) {
      case actions.ACTIVE_USER_LOADING_STARTED: {
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
          loadingError: false,
        };
      }
      case actions.ACTIVE_USER_LOADED: {
        return {
          isLoading: false,
          isLoaded: true,
          loadingError: false,
          ...action.payload,
        };
      }
      case actions.ACTIVE_USER_LOADING_FAILED: {
        return {
          ...state,
          isLoading: false,
          isLoaded: false,
          loadingError: true,
        };
      }
      case actions.CLEAR_ACTIVE_USER: {
        return {
          ...state,
          isLoading: false,
          isLoaded: false,
          loadingError: false,
        };
      }
      default:
        return state;
    }
  },
  likedArticles: (state = initialState.likedArticles, action) => {
    switch (action.type) {
      case actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_STARTED: {
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
          loadingError: false,
        };
      }
      case actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          loadingError: false,
          ids: action.payload,
        };
      }
      case actions.FETCH_ACTIVE_USER_LIKED_ARTICLES_FAILURE: {
        return {
          ...state,
          ...initialState.likedArticles,
          isLoading: false,
          isLoaded: false,
          loadingError: true,
        };
      }
      default:
        return state;
    }
  },
});
