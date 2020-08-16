import React from 'react'
import Blog from '../components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notifyReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'




const Bloglist = () => {

  const sorted = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.logged)
  const dispatch = useDispatch()

  const removeBlog = async (id) => {
    const blog = sorted.find(b => b.id === id)
    dispatch(deleteBlog(blog, id))
    dispatch(notify(`Removed blog "${blog.title}"`, 5))
  }

  const newLike = async (blog) => {
    dispatch(likeBlog(blog, blog.id))
    dispatch(notify(`Liked ${blog.title}`, 5))
  }

  return (
    <Table striped className="m-2">
      <tbody>
        {sorted.map((blog, i) => <tr key={i}><td><Blog blog={blog} user={user} remove={() => removeBlog(blog.id)} newLike={() => newLike(blog)} /></td></tr>)}
      </tbody>
    </Table>
  )
}

export default Bloglist