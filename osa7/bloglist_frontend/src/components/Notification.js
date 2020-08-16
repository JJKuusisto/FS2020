
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div className="container">
      {notification !== '' ?
        <Alert variant="primary">
          {notification}
        </Alert>
        : <div></div>
      }
    </div>
  )
}

export default Notification