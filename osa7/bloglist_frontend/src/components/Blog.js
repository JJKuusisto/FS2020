import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, newLike, user, remove }) => {
  const [view, setView] = useState(false)
  const [removable, setRemovable] = useState(false)


  useEffect(() => {
    if (user.username === blog.user.username) {
      setRemovable(true)
    }
  }, [blog.user.username, user.username])

  const style = {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    borderWidth: 1,
    border: 'solid',
    borderColor: '#000000',
    borderRadius: 6,
    background: '#ffeebf',
    marginBottom: 5
  }
  return (
    <div style={style} className="blog">
      {blog.title},  {blog.author + ' '}
      <button id='view-button' onClick={() => setView(!view)}>
        {view !== false ? 'Hide' : 'View'}
      </button>
      {removable !== false ?
        <button id='delete-button' onClick={remove}>remove</button>
        : <p></p>
      }
      {view !== false ?
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button id='like-button' onClick={newLike}>like</button></p>
          <p>{blog.user.name}</p>
        </div>
        : <p></p>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  newLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
