import React, { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function getAnecdote(max){
    let x = -1
    let y = 0;
    for(let i = 0; i < max; i++){
      if(points[i] > x){
        x = points[i]
        y = i;
      }
    }
    return y
  }

  const handleNextClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} points
      <br/>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[getAnecdote(anecdotes.length)]}
      <br/>
      has {points[getAnecdote(anecdotes.length)]} points
    </div>
  )
}

export default App;
