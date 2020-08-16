import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { notify } from '../reducers/notifyReducer'
import { newBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlog = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const postBlog = async (blog) => {
    try {
      dispatch(newBlog(blog))
      dispatch(notify(`New Blog ${blog.title} by ${blog.author} was added`, 5))
    } catch (exception) {
      dispatch(notify(exception.error, 5))
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    postBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    title.onReset()
    author.onReset()
    url.onReset()
  }
  return (

    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control {...title} />
        <Form.Label>author</Form.Label>
        <Form.Control {...author} />
        <Form.Label>url:</Form.Label>
        <Form.Control {...url} />
        <Button id='add' type="submit">create</Button>
      </Form.Group>
    </Form>

  )
}

export default NewBlog