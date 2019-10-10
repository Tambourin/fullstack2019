import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

const SingleUser = ({ user }) => {
  
  if(!user) {
    return null;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Blogs added</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </>
  )
}

SingleUser.propTypes = {
  user: propTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.id)
  }  
}

export default connect(mapStateToProps)(SingleUser);