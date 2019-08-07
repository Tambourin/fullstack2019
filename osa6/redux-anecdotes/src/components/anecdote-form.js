import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createAnecdote(event.target.anecdote.value);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm);
