import React from "react";
import PropTypes from "prop-types";
import AddComment from "./add-comment";

const Comments = ({ blog }) => {
  if(!blog.comments) {
    return null;
  }

  return (
    <div>
      <h3>Comments</h3>
      {blog.comments.map((comment, index) => <p key={index}>{comment}</p>)}
      <AddComment blog={blog}/>
    </div>  
  )
}

Comments.propTypes = {
  blog: PropTypes.object
}

export default Comments;