import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (message === null) {
    return;
  }

  let style = { border: "solid 5px" };
  if (message.substring(0, 5) === "error") {
    style.color = "red";
  } else {
    style.color = "green";
  }
  return <div style={style}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification;
