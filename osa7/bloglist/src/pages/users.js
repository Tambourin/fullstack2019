import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { setInitialUsers } from "../reducers/users-reducer";

const Users = ({ users, setInitialUsers }) => {
  
  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created:</td>
          </tr>
          {users.map(user => 
            <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>              
            </td>
              <td>{user.blogs.length}</td>        
            </tr>
          )}
        </tbody>        
      </table>
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array,
  setInitialUsers: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {setInitialUsers})(Users);