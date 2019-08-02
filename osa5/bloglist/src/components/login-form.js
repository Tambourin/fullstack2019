import React from "react";
import users from "../services/users";
import blogService from "../services/blogs";
import { useField } from "../hooks";
import PropTypes from "prop-types";

const LoginForm = ({ setUser, setNotification }) => {
  const usernameField = useField("text");
  const passwordField = useField("password");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await users.login(usernameField.base.value, passwordField.base.value);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (exception) {
      setNotification("error: Login failed");
      setTimeout(() => { setNotification(null)}, 5000);
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
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input 
          name="password"
          {...passwordField.base}
        />
        <br />
        <input type="submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default LoginForm;
