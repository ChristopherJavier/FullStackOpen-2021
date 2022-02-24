let timeoutID = 0
const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data.notification
        case 'REMOVE_NOTIFICATION':
            return action.data.notification
        default:
            return state
    }
}

export const setNewNotification = (message, timeout) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => dispatch({
            type: 'REMOVE_NOTIFICATION',
            data: {
                notification: null
            }
        }), timeout * 1000)

        dispatch({
            type: 'NEW_NOTIFICATION',
            data: {
                notification: message
            }
        })
    }
}

export default notificationReducer