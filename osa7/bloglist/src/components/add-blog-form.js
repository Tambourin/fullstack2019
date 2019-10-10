import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useField } from "../hooks";
import { showNotification } from "../reducers/notification-reducer";
import { addBlog } from "../reducers/blog-reducer";
import Button from "../components/button";

const AddBlogForm = (props) => {
  const titleField = useField("text");
  const authorField = useField("text");
  const urlField = useField("text");

  const clearFields = () => {
    titleField.reset();
    authorField.reset();
    urlField.reset();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(titleField.base.value && authorField.base.value && urlField.base.value) {      
      const blogToBeSubmitted = {
        title: titleField.base.value,
        author: authorField.base.value,
        url: urlField.base.value
      }
      try {
        const createdBlog = await props.addBlog(blogToBeSubmitted);
        
        console.log('createdBlog', createdBlog);
        props.showNotification(`Blog "${createdBlog.title}" created`);
        clearFields();
      } catch(error) {
        console.log(error);
        props.showNotification("error: There was an error submitting a blog");
      }
    } else {      
      props.showNotification("error: Empty fileds");
    }      
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          {...titleField.base}>
        </input>
        <label htmlFor="author">Author:</label>
        <input 
          name="author"
          {...authorField.base}>
        </input>
        <label htmlFor="url">URL</label>
        <input 
          name="url"
          {...urlField.base}>
        </input>
        <Button primary type="submit">Submit</Button>
      </form>
    </div>
  );
}

AddBlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  addBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { showNotification, addBlog })(AddBlogForm);