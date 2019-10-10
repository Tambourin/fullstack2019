import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notification = (props) => {
  const message = props.message;
  if (!message) {
    return null;
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

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }  
}
export default connect(mapStateToProps)(Notification);
