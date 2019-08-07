const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification: message
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: ""
      });
    }, time * 1000);
  };
};

export default notificationReducer;
