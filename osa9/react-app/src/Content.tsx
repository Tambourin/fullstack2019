import React from 'react';
import Part from './Part';

import { CoursePart } from './index';

interface ContentProps {
    parts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
    return (
        <div>
            {props.parts.map(part => {
                return <Part key={part.name} part={part} />
            })}
        </div>
    );
};

export default Content;