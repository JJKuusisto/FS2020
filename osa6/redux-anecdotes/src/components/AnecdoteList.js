import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const voting = (anecdote, dispatch) => {
  dispatch(voteAnecdote(anecdote.id))
  dispatch(notify(`You voted  "${anecdote.content}"`))
  setTimeout(() => {
    dispatch(notify(''))
  }, 5000)
}
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} <button onClick={handleClick}>vote</button></div>
    </div>
  )
}
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            voting(anecdote, dispatch)
          }
        />
      )}
    </ul>
  )
}
export default AnecdoteList