import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBlog } from "../reducers/blog-reducer";

const DeleteButton = ({ blog, deleteBlog }) => {

  const handleDelete = async (event) => {
    event.stopPropagation();
    if(window.confirm("Really delete entry")) {
      deleteBlog(blog.id);
    }    
  }

  return (
    <button onClick={handleDelete}>remove</button>    
  )
}

DeleteButton.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func
}

export default connect(null, { deleteBlog })(DeleteButton);