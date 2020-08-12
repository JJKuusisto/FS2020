import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(notify(`${content} added.`))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)
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