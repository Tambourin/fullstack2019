import React from "react";
import PropTypes from "prop-types";

const LoggedInfo = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  }

  return (
    <div>
      <p>Logged user: {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>    
  );
}

LoggedInfo.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoggedInfo;