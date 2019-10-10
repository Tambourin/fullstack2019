import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LikeButton from "../components/like-button";
import DeleteButton from "../components/delete-button";
import Comments from "../components/comments";


const SingleBlog = ({ blog, user }) => {
  if(!blog || !user) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <h2>{blog.author}</h2>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <LikeButton blog={blog} />
      <p>added by: {blog.user && blog.user.name ? blog.user.name : ""} </p>
      <Comments blog={blog} />
      {user.username === blog.user.username ? 
        <DeleteButton blog={blog} /> 
        : null}
        
    </div>
  )
}

SingleBlog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id),
    user: state.user
  }
}

export default connect(mapStateToProps)(SingleBlog);