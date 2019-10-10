import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import notificationReducer from "./reducers/notification-reducer";
import blogReducer from "./reducers/blog-reducer";
import userReducer from "./reducers/user-reducer";
import usersReducer from "./reducers/users-reducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
});

export default () => createStore(reducer, applyMiddleware(thunk));
