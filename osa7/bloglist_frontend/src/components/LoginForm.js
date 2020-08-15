import React from 'react'
import { useDispatch } from 'react-redux'
import { logUser } from '../reducers/loginReducer'
import { useField } from '../hooks/index'
import { notify } from '../reducers/notifyReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('text')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = { username: username.value, password: password.value }
      dispatch(logUser(user))
    } catch (exception) {
      dispatch(notify('wrong credentials'), 3)
    }

  }
  return (
    <div>
      <h2>Log In:</h2>
      <form onSubmit={handleLogin}>
        username: <input {...username} />
        password: <input {...password} />

        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
