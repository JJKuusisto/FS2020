import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedUser')
    if (logged) {
      const user = JSON.parse(logged)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`You're about to remove "${blog.title}" by ${blog.author}, proceed?`)) {
      const response = await blogService.remove(id)
      console.log(response)
      const newBlogs = blogs.filter(b => b.id !== id)
      setBlogs(newBlogs)
    }
  }

  const newLike = async (id) => {
    const blog = blogs.find(b => b.id === id)

    console.log(blog)
    const response = await blogService.update(id, blog)
    console.log(response)
    setBlogs(blogs.map(b => b.id !== id ? b : response))
  }

  const postBlog = async (blog) => {
    try {
      const response = await blogService.create(blog)
      console.log(response)
      setBlogs(blogs.concat(response))
      setErrorMessage(`New Blog ${response.title} by ${response.author} was added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(exception.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="Add new Blog" >
      <NewBlog createBlog={postBlog} />
    </Togglable>

  )

  const loginForm = () => (
    <div>
      <h2>Log In:</h2>
      <form onSubmit={handleLogin}>
        username: <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
        password: <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />

        <button type="submit">login</button>
      </form>
    </div>
  )

  const bloglist = ({ blogs, user, logout}) => {
    const sorted = blogs.sort((a, b) => a.likes < b.likes)
    return (
      <div>
        <h2>blogs</h2>
        {user !== null ?
          <p>{user.name} has logged in <button type="submit" onClick={logout}>logout</button></p> :
          <p></p>
        }
        {sorted.map((blog, i) => <Blog key={i} blog={blog} user={user} remove={() => removeBlog(blog.id)} newLike={() => newLike(blog.id)} />)}
      </div>
    )
  }

  const Notification = ({ message }) => (
    <div>
      <p>{message}</p>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          {newBlogForm()}
          {bloglist({ blogs, user, logout})}
        </div>
      }
    </div>
  )
}

export default App