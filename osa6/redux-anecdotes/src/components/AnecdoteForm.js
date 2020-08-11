import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={add}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}
export default NewAnecdote