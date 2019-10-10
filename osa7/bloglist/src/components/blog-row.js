import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { addBlog } from "../reducers/blog-reducer";

const rotate = keyframes`
  from {
    background-color: white;
  }

  to {
    background-color: orange;
  }
`;

const Row = styled.div`
  border: solid 1px;
  margin-bottom: 5px;

  &:hover {
    animation: ${rotate} 1s linear forwards;
  }
  
`;

const BlogRow = ({ blog, user }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Row onClick={() => setExpanded(!expanded)}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>      
    </Row>
  );
};

BlogRow.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}
export default connect(mapStateToProps, { addBlog })(BlogRow);
