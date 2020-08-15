
let timeoutID

const notifyReducer = (state = '', action) => {
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
    }, (length * 1000))
  }
}

export default notifyReducer