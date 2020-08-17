import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR)
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a => <option value={a.name}>{a.name}</option>)}
        </select>
        born: <input type="number" value={born} onChange={({ target }) => setBorn(Number(target.value))} />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
