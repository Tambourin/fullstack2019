import React, { useEffect } from 'react';
import { connect } from "react-redux";
import AnecdoteForm from  "./components/anecdote-form";
import AnecdoteList from "./components/anecdote-list";
import Notification from "./components/Notification";
import Filter from "./components/filter";
import { initialAnecdotes } from "./reducers/anecdoteReducer";

const App = (props) => {
  useEffect(() => {
   props.initialAnecdotes();
  }, [props]);

  return (
    <div>
      <Notification />           
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initialAnecdotes })(App);