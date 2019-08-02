import React from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const DeleteButton = ({ blog, blogs, setBlogs }) => {

  const handleDelete = async (event) => {
    event.stopPropagation();
    if(window.confirm("Really delete entry")) {
      const deletedBlog = await blogService.remove(blog.id);
      setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));
    }    
  }

  return (
    <button onClick={handleDelete}>remove</button>    
  )
}

DeleteButton.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default DeleteButton;