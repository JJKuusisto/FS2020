import React, { useState } from 'react'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        title: <input id='title' type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} /><br />
          author: <input id='author' type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} /><br />
          url: <input id='url' type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} /><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog