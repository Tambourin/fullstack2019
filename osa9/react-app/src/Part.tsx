import React from 'react';
import { CoursePart } from './index';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (x: never): never => {
    throw new Error('Unexpected object:'  + x);
  }

  const extraInfo = (): JSX.Element => {
    switch(part.name) {
      case 'Fundamentals': 
        return <div>
          <p>description: {part.description}</p>
        </div>;
      case 'Using props to pass data':
        return <div>
          <p>groupProjectCount: {part.groupProjectCount}</p>
        </div>;
      case 'Deeper type usage':
        return <div>
          <p>Link: {part.exerciseSubmissionLink}</p>
          <p>description: {part.description}</p>
        </div>;
      default:
        return assertNever(part);
    }
  }

  return (
    <div>
      <p>{part.name}</p>
      <p>exerciseCount: {part.exerciseCount}</p>      
      {extraInfo()}
      <p>----------------------</p>
    </div>
  )
}

export default Part;