import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Statistics = ({good, neutral, bad}) => {
  console.log("arviot:", good, neutral, bad);
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        no feedback given
      </div>
    );    
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={ ((good * 1) + (bad * -1)) / (good + neutral + bad) } />
          <Statistic text="positive" value={ good / (good + neutral + bad) * 100 + " %"} />
        </tbody>
      </table>
    </div>
  )
  
}

const Statistic = ( {text, value} ) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  );
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (value) => () => setGood(value);
  const setNeutralValue = (value) => () => setNeutral(value);
  const setBadValue = (value) => () => setBad(value);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button clickHandler={setGoodValue(good + 1)} text="Good" />
      <Button clickHandler={setNeutralValue(neutral + 1)} text="Neutral" />
      <Button clickHandler={setBadValue(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)