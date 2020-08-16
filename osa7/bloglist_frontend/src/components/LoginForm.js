import React from 'react'
import { useDispatch } from 'react-redux'
import { logUser } from '../reducers/loginReducer'
import { useField } from '../hooks/index'
import { notify } from '../reducers/notifyReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

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
    <Form inline onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username: </Form.Label>
        <Form.Control {...username} />
        <Form.Label>password: </Form.Label>
        <Form.Control {...password} />
        <Button variant="primary" id="login-button" type="submit">login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
