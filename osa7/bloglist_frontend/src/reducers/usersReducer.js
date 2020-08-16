import userService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'USERS_INIT',
      data: users
    })
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'USERS_INIT':
      return action.data
    default:
      return state
  }
}

export default usersReducer