import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {

  const users = useSelector(state => state.users.sort((a, b) => b.blogs.length - a.blogs.length))

  return (
    <div>
      <h2 className="m-2">Users</h2>
      <Table striped>
        <tbody>
          <tr className="font-weight-bold bg-primary text-white"><td>User</td><td>blogs created</td></tr>
          {users.map((u, i) =>
            <tr key={i}><td><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList