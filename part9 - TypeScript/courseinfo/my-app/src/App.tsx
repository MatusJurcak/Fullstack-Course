import React from 'react';

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase{
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface Part {
  name: string;
  exerciseCount: number;
}

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const parts = []
  
  switch (part.type) {
    case "normal":
      parts.push(<div><i>{part.description}</i></div>)
      break;
    case "groupProject":
      parts.push(<div>project exersices {part.groupProjectCount}</div>)
      break;
    case "submission":
      parts.push(<div><i>{part.description}</i></div>)
      parts.push(<div>submit to {part.exerciseSubmissionLink}</div>)
      break;
    case "special":
      parts.push(<div><i>{part.description}</i></div>)
      parts.push(<div>required skills: {part.requirements.join(', ')}</div>)
      break;
    default:
      return assertNever(part);
  }
  
  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      <div><strong>{part.name} {part.exerciseCount}</strong></div>
      {parts.map(part => part)}
    </div>
  )
}

const Content = ({ parts }: { parts: CoursePart[] }) => {
  
  return (
    <div>
      {parts.map(part =><Part key={part.name} part={part} />)}
    </div>
  )
}

const Total = ({ parts }: { parts: Part[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
