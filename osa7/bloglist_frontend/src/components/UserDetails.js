import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const UserDetails = ({ id }) => {
  const user = useSelector(state => state.users.find(u => u.id === id))
  if (!user) {
    return null
  }

  return (
    <div>
      <h2 className="m-3">{user.name}</h2>
      <Table striped>
        <tbody>
          {user.blogs.map(b => <tr key={b.id}><td>{b.title}</td></tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserDetails