import React from 'react'
import { Button } from 'react-bootstrap'

const User = ({ user }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <span>
      {user.name}  has logged in <Button type="submit" onClick={logout}>logout</Button>
    </span>
  )
}

export default User