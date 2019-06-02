import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (        
        <h1>{props.name}</h1>
    );
}

const Total = (props) => {
  console.log(props);
    return (
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    );
}

const Content = (props) => {
  return (       
    <> 
      <Part text={props.parts[0].name} number ={props.parts[0].exercises}/>
      <Part text={props.parts[1].name} number ={props.parts[1].exercises}/>
      <Part text={props.parts[2].name} number ={props.parts[2].exercises}/>
    </>
  );
}

const Part = (props) => {
    return (
        <p>
            {props.text}
            <span> </span> 
            <span>{props.number}</span>
        </p>   
        
    );
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        "name" : 'Fundamentals of React',
        "exercises" : 10
      },
      {
        "name" : 'Using props to pass data',
        "exercises" : 7,
      },
      {
        "name" : 'State of a component',
        "exercises" : 14,
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));