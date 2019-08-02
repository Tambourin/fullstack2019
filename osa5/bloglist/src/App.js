import React, { useState, useEffect } from "react";
import LoginForm from "./components/login-form";
import BlogRow from "./components/blog-row";
import LoggedInfo from "./components/logged-info";
import AddBlogForm from "./components/add-blog-form";
import Notification from "./components/notification";
import Toggleable from "./components/toggleable";
import SignupForm from "./components/signup-form";
import blogService from "./services/blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        response.sort((a, b) => b.likes - a.likes);
        setBlogs(response);
      })
      .catch(error => {
        setNotification(`error: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  return (
    <div>
      {notification ? <Notification message={notification} /> : null}
      <p>Juuhuu</p>
      {user === null ? (
        <div>
          <LoginForm setUser={setUser} setNotification={setNotification} />
          <Toggleable text="Signup">
            <SignupForm setNotification={setNotification}/>
          </Toggleable>
        </div>
      ) : (
        <div>
          
          <LoggedInfo user={user} setUser={setUser} />
          <Toggleable text="Add new blog">
            <AddBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
            />
          </Toggleable>  
          <h2>Blogs</h2>
          {blogs.map(blog => (
            <BlogRow 
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
