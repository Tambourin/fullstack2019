import React, { useState } from "react";
import LikeButton from "./like-button";
import DeleteButton from "./delete-button";
import PropTypes from "prop-types";

const BlogRow = ({ blog, blogs, setBlogs, user }) => {
  const [expanded, setExpanded] = useState(false);

  const style = {
    border: "solid 1px",
    marginBottom: "5px"
  };

  return (
    <div className="blog-row" style={style} onClick={() => setExpanded(!expanded)}>
      {blog.title}
      {expanded ? (
        <div>
          {blog.author} <br />
          {blog.url} <br />
          Likes: {blog.likes}
          <LikeButton blog={blog} blogs={blogs} setBlogs={setBlogs} /> <br />
          added by: {blog.user && blog.user.name ? blog.user.name : ""} <br />
          {blog.user && user.username === blog.user.username ? (
            <DeleteButton blog={blog} blogs={blogs} setBlogs={setBlogs} />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

BlogRow.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogRow;
