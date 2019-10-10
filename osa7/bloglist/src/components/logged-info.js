import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Logout } from 'styled-icons/material'
import { resetUser } from "../reducers/user-reducer";
import { LogOut } from "styled-icons/boxicons-regular";

const LoggedInfoNoHistory = ({ user, resetUser, history }) => {
  if(!user) {
    return null;
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    resetUser();
    console.log(user);
    history.push("/");
  }

  return (
    <div>
      <p>Logged user: {user.name}</p>
      <button onClick={handleLogout}><LogOut />Logout</button>
    </div>    
  );
}

LoggedInfoNoHistory.propTypes = {
  user: PropTypes.object,
  resetUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }  
}

const LoggedInfo = withRouter(LoggedInfoNoHistory);

export default connect(mapStateToProps, { resetUser })(LoggedInfo);