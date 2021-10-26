import anecdoteService from '../services/anecdotes'

const sorted = (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      return state.map(a => a.id !== votedAnecdote.id ? a : votedAnecdote).sort(sorted)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort(sorted)
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const toVote = { ...anecdote, votes: anecdote.votes + 1 }
    const data = await anecdoteService.update(toVote)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer