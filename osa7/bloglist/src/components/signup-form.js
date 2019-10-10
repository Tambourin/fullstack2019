import React, { useState } from "react";
import { connect } from "react-redux";
import userService from "../services/users";
import PropTypes from "prop-types";
import { showNotification } from "../reducers/notification-reducer";

const SignupForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.create(username, password, name);
      props.showNotification("User created");
    } catch(error) {
      if (error.response) {
        props.showNotification(`error: ${JSON.stringify(error.response.data)}`);
      } else {
        props.showNotification("error: There was an error with signup");
      }
      
    }
  }

  SignupForm.propTypes = {
    showNotification: PropTypes.func.isRequired
  }

  return (
  <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username</label>
    <input 
      id="signUpUsername"
      type="text" 
      name="username" 
      value={username} 
      onChange={(event) => setUsername(event.target.value)} />
    <label htmlFor="password">Password</label>
    <input
      id="signUpPassword"
      type="password" 
      name="password" 
      value={password} 
      onChange={(event) => setPassword(event.target.value)}/>
    <label htmlFor="name">Name</label>
    <input 
      id="signUpName"
      type="text" 
      name="name" 
      value={name}
      onChange={(event) => setName(event.target.value)}/>
      <input id="signupSubmitButton" type="submit" />
  </form>    
  )
}

export default connect(null, { showNotification })(SignupForm);