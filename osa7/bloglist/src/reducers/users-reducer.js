import userService from "../services/users";

const INITIALIZE_USERS = "INITIALIZE_USERS";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_USERS:
      return action.users;
        
    default:
      return state;
  }
}

const initializeUsers = (users) => {
  return {
    type: INITIALIZE_USERS,
    users: users
  }
}

export const setInitialUsers = () => {
  return async (dispatch) => {
    console.log("setting Initial Users");
    const users = await userService.getAll();
    console.log(users); 
    dispatch(initializeUsers(users));
  }
}

export default usersReducer;

