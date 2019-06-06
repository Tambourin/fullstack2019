import React from 'react'


const Course = (props) => {
  const course = props.course;
  return (
    <div>
        <Header name={course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>      
    </div>
  )
}

const Header = (props) => {
    return (        
        <h2>{props.name}</h2>
    );
}

const Total = ({ parts }) => {  
  const calculateTotal = () => 
      parts.reduce( (sum, part) => sum + part.exercises, 0 );
  
  return (
      <p>Yhteensä {calculateTotal()} tehtävää</p>
  );
}

const Content = ({ parts }) => {
  const rows = () => {
    return (
      parts.map(part => <Part key={part.id} text={part.name} number={part.exercises} />)
    );
  }
  return (       
    <>
      {rows()}
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

export default Course