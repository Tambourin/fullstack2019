import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { increaseBlogLikes } from "../reducers/blog-reducer";
import Button from "../components/button";

const LikeButton = ({ blog, increaseBlogLikes }) => {
  const handleLike = async (event) => {
    event.stopPropagation();
    increaseBlogLikes(blog);
  }

  return (
    <Button onClick={handleLike}>like</Button>
  )
}

LikeButton.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseBlogLikes: PropTypes.func.isRequired
}

export default connect(null, { increaseBlogLikes })(LikeButton);