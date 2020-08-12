const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      if (state !== '') {
        clearTimeout(timeoutID)
      }
      state = action.notification
      return state
    default:
      return state
  }
}

let timeoutID

export const notify = (notification, length) => {

  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      notification: notification,
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        notification: '',
      })
    }, length * 1000)
  }
}

export default notificationReducer