import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const mapCourses = () => courses.map(course => <Course key={course.id} course={course} />)
  return (
    <div>
      <h1>Opetusohjelma</h1>
      {mapCourses()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));