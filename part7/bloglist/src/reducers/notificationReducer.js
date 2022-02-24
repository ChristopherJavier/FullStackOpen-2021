const initialState = {}
let timeoutID =  0

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return initialState
        default:
            return initialState
    }
}

export const setNewNotification = (message, type) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: {
                notification: message,
                type: type
            }
        })

        timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, 5000)
    }
}

export default notificationReducer