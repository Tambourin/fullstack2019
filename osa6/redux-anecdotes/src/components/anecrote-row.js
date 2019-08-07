import React from "react"

const AnecdoteRow = ({ anecdote, onClick }) => {
  return (
    <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={onClick}>vote</button>
          </div>
        </div>
  )
}

export default AnecdoteRow