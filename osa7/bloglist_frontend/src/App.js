import React, { useEffect } from 'react'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import UserList from './components/UserList'
import { useDispatch, } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { initialBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { initUsers } from './reducers/usersReducer'
import User from './components/User'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
    console.log('initials')
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <div>
        <h2>Blogs</h2>
        {window.localStorage.getItem('loggedUser') === false ?
          <div>
            <LoginForm />
          </div>
          :
          <User user={JSON.parse(window.localStorage.getItem('loggedUser'))} />
        }
      </div>
      <Switch>
        <Route path="/blogs">
          <Togglable buttonLabel="Add new Blog" >
            <NewBlog />
          </Togglable>
          <Bloglist />
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <UserList />
        </Route>
        <Route path="/">
          <Bloglist />
        </Route>
      </Switch>
    </div>
  )
}

export default App