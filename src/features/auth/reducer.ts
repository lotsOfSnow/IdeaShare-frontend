import Cookies from "js-cookie";
import * as actions from "./constants";
import { Auth } from "./models";
import { AuthActions } from "./types";

export type AuthState = Readonly<Auth>;

const initialState: AuthState = {
  token: Cookies.get("token"),
  isLoading: false,
  isLoaded: false,
  loadingError: false,
  isAuthenticated: false,
  errors: null,
};

export default function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case actions.LOGIN_STARTED: {
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: true,
        isLoaded: false,
        errors: null,
        loadingError: false,
      };
    }
    case actions.LOGIN_SUCCESS: {
      Cookies.set("token", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        token: action.payload,
        errors: null,
        loadingError: false,
      };
    }
    case actions.AUTH_CHECK_STARTED: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errors: null,
        loadingError: false,
      };
    }
    case actions.AUTH_CHECK_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        token: Cookies.get("token"),
        errors: null,
        loadingError: false,
      };
    }
    case actions.LOGIN_FAIL:
    case actions.AUTH_FAILED: {
      Cookies.remove("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        isLoaded: false,
        token: null,
        errors: action.payload,
        loadingError: true,
      };
    }
    case actions.LOGOUT_SUCCESS: {
      Cookies.remove("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        isLoaded: false,
        token: null,
        erorrs: null,
        loadingError: false,
      };
    }
    default:
      return state;
  }
}

/*
export default combineReducers<AuthState, AuthActions> = (
  (state = initialState.auth, action) =>  {
    switch (action.type) {
      case actions.LOGIN_STARTED: {
        return {
          ...state,
          isAuthenticated: false,
          isLoading: true,
          isLoaded: false,
        };
      }
      case actions.LOGIN_FAIL: {
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          isLoaded: false,
        };
      }
      case actions.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          isLoaded: true,
        };
      }
      case actions.LOGOUT_SUCCESS: {
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          isLoaded: false,
        };
      }
      case actions.AUTH_FAILED: {
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          isLoaded: false,
        };
      }
      default:
        return state;
    }
  },
});

*/
