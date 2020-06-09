import { combineReducers } from "redux";
import activeUserReducer from "../features/activeUser/reducer";
import articleReducer from "../features/articles/reducer";
import authReducer from "../features/auth/reducer";
import commentsReducer from "../features/comments/reducer";
import userReducer from "../features/users/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  activeUser: activeUserReducer,
  user: userReducer,
  articles: articleReducer,
  comments: commentsReducer,
});

export default rootReducer;
