import React, { useState } from 'react'

const Statistic = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.clicks} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.clicks}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if ((props.good + props.bad + props.neutral) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text='good' clicks={props.good} />
        <Statistic text='neutral' clicks={props.neutral} />
        <Statistic text='bad' clicks={props.bad} />
        <Statistic text='all' clicks={props.bad + props.good + props.neutral} />
        <Statistic text='average' clicks={(props.bad * -1 + props.good) / (props.bad + props.neutral + props.good)} />
        <Statistic text='positive' clicks={props.good * 100 / (props.bad + props.good + props.neutral)} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    < button onClick={handleClick} >
      {text}
    </button >

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App