import React from "react";
import blogService from "../services/blogs";
import { useField } from "../hooks";
import PropTypes from "prop-types";

const AddBlogForm = ({ blogs, setBlogs, setNotification }) => {
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
        const createdBlog = await blogService.create(blogToBeSubmitted);
        setBlogs(blogs.concat(createdBlog));
        setNotification(`Blog "${createdBlog.title}" created`);
        setTimeout(() => { setNotification(null)}, 5000);
        clearFields();
      } catch(error) {
        setNotification("error: There was an error submitting a blog");
        setTimeout(() => { setNotification(null)}, 5000);
      }
    } else {
      setNotification("error: Empty fileds");
      setTimeout(() => { setNotification(null)}, 5000);
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
        <input type="submit"></input>
      </form>
    </div>
  );
}

AddBlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default AddBlogForm;