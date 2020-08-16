import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

  const users = useSelector(state => state.users.sort((a, b) => b.blogs.length - a.blogs.length))
  console.log(users)

  return (
    <div>
      <table>
        <tbody>
          <tr><td>User</td><td>blogs created</td></tr>
          {users.map((u, i) =>
            <tr key={i}><td><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList