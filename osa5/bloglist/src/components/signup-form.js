import React, { useState } from "react";
import userService from "../services/users";
import PropTypes from "prop-types";

const SignupForm = ({ setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.create(username, password, name);
      setNotification("User created");
    } catch(error) {
      if (error.response) {
        setNotification(`error: ${JSON.stringify(error.response.data)}`);
      } else {
        setNotification("error: There was an error with signup");
      }
      
    }
  }

  SignupForm.propTypes = {
    setNotification: PropTypes.func.isRequired
  }

  return (
  <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username</label>
    <input 
      type="text" 
      name="username" 
      value={username} 
      onChange={(event) => setUsername(event.target.value)} />
    <label htmlFor="password">Password</label>
    <input 
      type="password" 
      name="password" 
      value={password} 
      onChange={(event) => setPassword(event.target.value)}/>
    <label htmlFor="name">Name</label>
    <input 
      type="text" 
      name="name" 
      value={name}
      onChange={(event) => setName(event.target.value)}/>
      <input type="submit" />
  </form>    
  )
}

export default SignupForm;