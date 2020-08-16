import React from 'react'
import { useSelector } from 'react-redux'

const UserDetails = ({ id }) => {
  const user = useSelector(state => state.users.find(u => u.id === id))
  console.log(user)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2 className="m-3">{user.name}</h2>
      <ul>
        {user.blogs.map(b => <li className="disabled" key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetails