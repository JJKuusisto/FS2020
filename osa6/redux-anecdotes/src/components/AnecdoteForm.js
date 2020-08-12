import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)
    props.notify(`${content} added.`, 5)
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

const mapDispatchToProps = {
  addAnecdote,
  notify
}

export default connect(null, mapDispatchToProps)(NewAnecdote)