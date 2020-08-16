import React, { useEffect } from 'react'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { initialBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { initUsers } from './reducers/usersReducer'
import User from './components/User'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const user = useSelector(state => state.logged)

  const userMatch = useRouteMatch('/users/:id')
  const userId = userMatch ? userMatch.params.id : null
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogId = blogMatch ? blogMatch.params.id : null

  return (
    <div className="container">
      <Notification />
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span"><Link to="/blogs">Blogs</Link></Nav.Link>
              <Nav.Link href="#" as="span"><Link to="/users">Users</Link></Nav.Link>
              <Nav.Link href="#" as="span" className="d-flex justify-content-end">
                {user === null
                  ? <LoginForm />
                  : <User user={user} />
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Switch>
        <Route path="/users/:id">
          <UserDetails id={userId} />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails id={blogId} />
        </Route>
        <Route path="/blogs">
          {user !== null
            ?
            <div>
              <h2>Blogs</h2>
              <Togglable buttonLabel="Add new Blog" >
                <NewBlog />
              </Togglable>
              <Bloglist />
            </div>
            :
            <Bloglist />
          }
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          {user !== null
            ?
            <div>
              <h2>Blogs</h2>
              <Togglable buttonLabel="Add new Blog" >
                <NewBlog />
              </Togglable>
              <Bloglist />
            </div>
            :
            <Bloglist />
          }
        </Route>
      </Switch>
    </div >
  )
}

export default App