import userService from "../services/users"; 
import blogService from "../services/blogs";

const SET_USER = "SET_USER";
const RESET_USER = "RESET_USER";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:   
      return action.user;
    case RESET_USER:
      return null;
    default:
      return state;
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    user: user
  }
}

export const resetUser = () => {
  return {
    type: RESET_USER
  }
}

export const setActiveUser = (username, password) => {
  return async (dispatch) => {
    const user = await userService.login(username, password);
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    dispatch(setUser(user));    
  }
}

export const setInitialUser = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }
}

export default userReducer;