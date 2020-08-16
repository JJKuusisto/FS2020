import React from 'react'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notifyReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'
import { Form, Button } from 'react-bootstrap'

const BlogDetails = ({ id }) => {
  const comment = useField('text')
  const dispatch = useDispatch()
  const history = useHistory()
  const blog = useSelector(state => state.blogs.find(u => u.id === id))
  const user = useSelector(state => state.logged)
  if (!blog || !user) {
    return null
  }

  const newLike = async (blog) => {
    dispatch(likeBlog(blog, blog.id))
    dispatch(notify(`Liked ${blog.title}`, 5))
  }

  const removeBlog = async (blog) => {
    dispatch(deleteBlog(blog, blog.id))
    history.push('/')
  }

  const newComment = async () => {
    const blogWithNewComment = { ...blog, comments: blog.comments.concat(comment.value) }
    dispatch(commentBlog(blogWithNewComment, blog.id))
  }

  return (
    <div>
      <h3 className="mt-3 p-2 bg-secondary text-light">{blog.title}, {blog.author}</h3>
      <div className="p-2">
        <span className="m-2 d-block text-lg-left"><a href={blog.url} >{blog.url}</a></span>
        <span className="m-2 d-block text-lg-left">
          {blog.likes} likes <Button onClick={() => newLike(blog)}>like</Button>
          {user.username === blog.user.username
            ? <Button className="ml-1" onClick={() => removeBlog(blog)}>delete</Button>
            : <p></p>
          }
        </span>
        <span>added by: <span className="font-weight-bold font-italic">{blog.user.name}</span></span>
      </div>
      <h3 className="mt-4">comments</h3>
      <Form className="d-block w-100" onSubmit={newComment}>
        <Form.Group>
          <Form.Control className="m-1" {...comment} />
          <Button className="m-1" type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ul className="list-unstyled">
        {blog.comments.map((c, i) =>
          <li key={i} className="border border-secondary p-2 m-2">{c}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogDetails