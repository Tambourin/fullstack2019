import React from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const LikeButton = ({ blog, blogs, setBlogs }) => {
  const handleLike = async (event) => {
    event.stopPropagation();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,     
    }
    const response = await blogService.update(updatedBlog);    
    const newArrayOfBlogs = blogs.map((blog) => blog.id === response.id ? response : blog); 
    newArrayOfBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(newArrayOfBlogs);
  }

  return (
    <button onClick={handleLike}>like</button>
  )
}

LikeButton.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default LikeButton;