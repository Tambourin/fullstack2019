import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route } from "react-router-dom";
import Notification from "./components/notification";
import NavBar from "./components/nav-bar";
import styled from "styled-components";
import Users from "./pages/users";
import SingleUser from "./pages/single-user";
import SingleBlog from "./pages/single-blog";
import Root from "./pages/root";
import { showNotification } from "./reducers/notification-reducer";
import { fetchInitialBlogData } from "./reducers/blog-reducer";
import { setInitialUser } from "./reducers/user-reducer";
import { setInitialUsers } from "./reducers/users-reducer";

const Page = styled.div`
  margin: auto;
  margin-top: 15px;
  width: 80%;
`;

function App({ fetchInitialBlogData, setInitialUser, setInitialUsers }) {

  useEffect(() => {
    fetchInitialBlogData();
  }, [fetchInitialBlogData]);

  useEffect(() => {
    setInitialUser();
  }, [setInitialUser]);

  useEffect(() => {
    setInitialUsers();
  }, [setInitialUsers]);

  return (
    <div>      
      <Notification />
      <BrowserRouter > 
        <NavBar />
        <Page>
          <Route exact path="/" render={() => 
            <Root />
          } />
          <Route exact path="/users" render={() =>
            <Users />
          } />
          <Route path="/users/:id" render={({ match }) => 
            <SingleUser id={match.params.id} />
          } />
          <Route path="/blogs/:id" render={({ match }) =>
            <SingleBlog id={match.params.id} />
          } />
        </Page>
      </BrowserRouter>
      
    </div>
  );
}

App.propTypes = {
  showNotification: PropTypes.func,
  fetchInitialBlogData: PropTypes.func,
  setInitialUser: PropTypes.func,
  setInitialUsers: PropTypes.func,
  blogs: PropTypes.array,
  user: PropTypes.object
};

export default connect(
  null,
  { showNotification, fetchInitialBlogData, setInitialUser, setInitialUsers }
)(App);
