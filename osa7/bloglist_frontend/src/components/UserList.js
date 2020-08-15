import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {

  const users = useSelector(state => state.users.sort((a, b) => b.blogs.length - a.blogs.length))
  console.log(users)

  return (
    <div>
      <table>
        <tbody>
          <tr><td>User</td><td>blogs created</td></tr>
          {users.map((u, i) =>
            <tr key={i}><td>{u.name}</td><td>{u.blogs.length}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList