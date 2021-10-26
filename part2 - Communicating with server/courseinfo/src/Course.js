import React from 'react'

const Part = ({ part }) => {
    return (
        <div>
            {part.name} {part.exercises}
        </div>
    )
}

const Course = ({ course }) => {

    const total = course.parts.reduce(
        (s, p) => s + p.exercises
        , 0
    )

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => 
                <Part key={part.id} part={part} />    
            )}
            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Course