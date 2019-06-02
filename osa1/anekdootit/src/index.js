import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote, numberOfVotes}) => {
  return (
    <div>
      <p>{anecdote}</p>    
      <Votes votes={numberOfVotes} />  
    </div>
  );
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Votes = (props) => {
  return (<p>has {props.votes} votes</p>);  
}

const MostVotes = ({anecdote, numberOfVotes}) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
      <Votes votes={numberOfVotes} />
    </div>
  )
}

const App = (props) => {
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState([0, 0, 0, 0, 0, 0]);


  const selectRandom = () => {
    let lenght = props.anecdotes.length;
    setSelected(Math.floor(Math.random() * lenght));
  }

  const castVote = () => {    
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);    
  }

  const calculateMostVoted = () => {
    let biggestNumber = 0;
    let indexOfBiggestNumber = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > biggestNumber) {
        biggestNumber = votes[i];
        indexOfBiggestNumber = i;
      }
    }
    return indexOfBiggestNumber;
  }

debugger;

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} numberOfVotes={votes[selected]} />
      <Button handleClick={castVote} text={"vote"}/>
      <Button handleClick={selectRandom} text={"next anecdote"}/>
      <MostVotes anecdote={anecdotes[calculateMostVoted()]} numberOfVotes={votes[calculateMostVoted()]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

