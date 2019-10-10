import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "../components/login-form";
import BlogRow from "../components/blog-row";
import AddBlogForm from "../components/add-blog-form";
import Toggleable from "../components/toggleable";
import SignupForm from "../components/signup-form";


const Root = ({ blogs, user}) => {
  return (
    <div>
    {user === null ? (
      <div>
        <LoginForm />
        <Toggleable text="Signup">
          <SignupForm />
        </Toggleable>
      </div>
    ) : (
      <div>          
        <Toggleable text="Add new blog">
          <AddBlogForm />
        </Toggleable>
        <h2>Blogs</h2>
        {blogs.map(blog => (
          <BlogRow key={blog.id} blog={blog} />
        ))}
      </div>
    )}
    </div>
  )
}

Root.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

export default connect(mapStateToProps)(Root);