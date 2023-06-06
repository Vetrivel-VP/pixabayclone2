import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import feedReducer from "./reducers/feedReducer";

const myReducer = combineReducers({
  user: userReducer,
  feeds: feedReducer,
});

export default myReducer;
