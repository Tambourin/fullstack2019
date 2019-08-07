import anecdoteService from "../services/anecdoteService"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT' :
      return action.anecdotes
    case 'VOTE' :
      const id = action.data.id
      const anecdoteToChange = state.find(blog => blog.id === id)
      const newAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const updatedState = state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
      return updatedState
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
    case 'NEW' :
      return [...state, action.data];
    default : 
      return state
  }  
}

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      anecdotes: anecdotes
    });    
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: "NEW",
      data: newAnecdote
    });
         
  }
} 

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.update(updatedAnecdote);
    dispatch({
      type: "VOTE",
      data: {
        id: updatedAnecdote.id 
      }
    });
  }
}

export default anecdoteReducer