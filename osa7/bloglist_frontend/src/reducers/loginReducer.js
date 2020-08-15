import loginService from '../services/login'
import blogService from '../services/blogs'

export const logUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const setUser = () => {
  return async dispatch => {
    const logged = window.localStorage.getItem('loggedUser')
    if (logged) {
      const user = JSON.parse(logged)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGGED',
        data: user
      })
    }
  }

}
const loginReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGGED':
      return action.data
    default:
      return state
  }
}

export default loginReducer