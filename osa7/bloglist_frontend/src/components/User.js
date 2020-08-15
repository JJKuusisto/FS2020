import React from 'react'

const User = ({ user }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <div>
      {user.name} has logged in <button type="submit" onClick={logout}>logout</button>
    </div>
  )
}

export default User