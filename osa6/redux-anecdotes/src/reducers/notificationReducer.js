const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      state = action.notification
      return state
    default:
      return state
  }
}

export const notify = (notification, length) => {

  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      notification: notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        notification: '',
      })
    }, length * 1000)
  }
}

export default notificationReducer