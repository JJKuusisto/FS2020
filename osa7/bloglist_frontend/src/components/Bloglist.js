import React from 'react'
import Blog from '../components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notifyReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Bloglist = () => {
  const sorted = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.logged)
  const dispatch = useDispatch()
  console.log(sorted)

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
    <div>
      {sorted.map((blog, i) => <Blog key={i} blog={blog} user={user} remove={() => removeBlog(blog.id)} newLike={() => newLike(blog)} />)}
    </div>
  )
}

export default Bloglist