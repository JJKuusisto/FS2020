const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      state = action.notification
      return state
    default:
      return state
  }
}

export const notify = notification => {
  return {
    type: 'NOTIFY',
    notification: notification
  }
}

export default notificationReducer