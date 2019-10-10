const SET_NOTIFICATION = "SET_NOTIFICATION";

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case SET_NOTIFICATION :
      return action.message;
    default : 
      return state;
  }
}

const setNotification = (message) => {
  return {
    type: SET_NOTIFICATION,
    message: message
  }
}

export const showNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 3000);
  }
    
}
  


export default notificationReducer;