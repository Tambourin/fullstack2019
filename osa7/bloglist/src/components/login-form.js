import React from "react";
import { connect } from "react-redux";
import { useField } from "../hooks";
import PropTypes from "prop-types";
import { showNotification } from "../reducers/notification-reducer";
import { setActiveUser } from "../reducers/user-reducer";

const LoginForm = (props) => {
  const usernameField = useField("text");
  const passwordField = useField("password");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      props.setActiveUser(usernameField.base.value, passwordField.base.value);
      //const user = await users.login(usernameField.base.value, passwordField.base.value);
      //props.setUser(user);
      //blogService.setToken(user.token);
      //window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (exception) {
      props.showNotification("error: Login failed");
    }    
  };

  return (
    <div>
      <h2>Login:</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          {...usernameField.base}
          name="username"
          id="loginUsername"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input 
          {...passwordField.base}
          name="password"
          id="loginPassword"
        />
        <br />
        <input id="loginSubmit" type="submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  showNotification: PropTypes.func.isRequired,
  setActiveUser: PropTypes.func.isRequired
}

export default connect(null, { showNotification, setActiveUser })(LoginForm);
