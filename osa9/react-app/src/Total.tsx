import React from 'react';
import { CoursePart } from './index';

interface TotalProps {
    parts: CoursePart[];
}

const Total: React.FC<TotalProps> = (props) => {
    return (
        <div>
            Number of exercises{" "}
            {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
};

export default Total;