import * as actions from "./constants";
import { User } from "./models";
import { UserActions } from "./types";

export type UserState = Readonly<User>;

const initialState: UserState = {
  isLoading: false,
  isLoaded: false,
  loadingError: false,
  id: null,
  userName: null,
  firstName: null,
  lastName: null,
  isRealNameHidden: null,
  registrationDate: null,
  profilePicture: null,
  description: null,
  articlesWritten: null,
  likesReceived: null,
};

export default function usersReducer(
  state = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case actions.FETCH_USER_STARTED: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        loadingError: false,
      };
    }
    case actions.FETCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        loadingError: false,
        ...action.payload,
      };
    }
    case actions.FETCH_USER_FAILURE: {
      return {
        ...initialState,
        loadingError: true,
      };
    }

    default:
      return state;
  }
}
