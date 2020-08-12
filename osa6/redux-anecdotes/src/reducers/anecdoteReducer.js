import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updated = await anecdoteService.vote(anecdote.id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updated.id
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data
      const votedAnecdote = state.find(a => a.id === id)
      const addVote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : addVote).sort((a, b) => b.votes - a.votes)

    case 'ADD':
      return [...state, action.data]

    case 'INIT':
      return action.data

    default:
      return state
  }
}


export default anecdoteReducer