import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const myReducer = combineReducers({
  user: userReducer,
});

export default myReducer;
