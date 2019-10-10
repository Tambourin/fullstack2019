import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCommentToBlog } from "../reducers/blog-reducer";
import Button from "../components/button";


const AddComment = ({ blog, addCommentToBlog }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    addCommentToBlog(blog, event.target.commentField.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="commentField"></input>
        <Button primary>Send</Button>
      </form>
    </div>    
  )
}

AddComment.propTypes = {
  blog: PropTypes.object,
  addCommentToBlog: PropTypes.func
}

export default connect(null, { addCommentToBlog })(AddComment);