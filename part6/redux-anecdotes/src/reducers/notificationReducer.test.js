import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
    test('The notification state can be set', () => {
        const state = ''
        const action = {
            type: 'NEW_NOTIFICATION',
            data: {
                notification: 'The action was successful'
            }
        }
        
        deepFreeze(state)
        const newState = notificationReducer(state, action)

        expect(state).toBe('')
        expect(newState).toContain(action.data.notification)
    })
})