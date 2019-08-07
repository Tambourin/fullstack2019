import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import AnecdoteRow from "./anecrote-row";
import { setNotification } from "../reducers/notification-reducer";

const AnecdoteList = props => {
  const vote = (anecdote) => {    
    return () => {
      props.voteAnecdote(anecdote);
      const votedAnecdote = props.anecdotes.find(a => a.id === anecdote.id)
        .content;
      props.setNotification(`You voted: ${votedAnecdote}`, 3);
      //setTimeout(() => props.setNotification(""), 5000);
    };
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote => (
        <AnecdoteRow
          key={anecdote.id}
          anecdote={anecdote}
          onClick={vote(anecdote)}
        />
      ))}
    </>
  );
};

const filterAnecdotes = state => {
  const filterWord = state.filter.toLowerCase();
  return state.anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filterWord)
  );
};

const mapStateToProps = state => {
  return {
    anecdotes: filterAnecdotes(state)
  };
};

const mapDispatchToProps = { 
  voteAnecdote,
  setNotification  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
