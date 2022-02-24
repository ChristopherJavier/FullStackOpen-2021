import anecdotesReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {

    const anecdotes = [
        {
            "content": "Adding manpower to a late software project makes it later!",
            "id": "21149",
            "votes": 5
          },
          {
            "content": "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
            "id": "69581",
            "votes": 0
          }
    ]

    test('A vote can be added to the anecdote', () => {
        const state = anecdotes
        const action = {
            type: 'NEW_VOTE',
            data: anecdotes[0]
        }
    
        deepFreeze(state)
        const newState = anecdotesReducer(state, action)

        expect(newState).toHaveLength(state.length)
        expect(state[0].votes).toBe(5)
        expect(newState).toContainEqual({
            ...state[0],
            votes: state[0].votes + 1
        })
    })

    test('A new note can be added', () => {
        const state = anecdotes
        const action = {
            type: 'NEW_ANECDOTE',
            data: {
                content: "Testing the anecdotes reducer",
                id: 1001,
                votes: 10
            }
        }

        deepFreeze(state)
        const newState = anecdotesReducer(state, action)

        console.log(newState)
        expect(state).toHaveLength(newState.length - 1)
        expect(newState).toHaveLength(state.length + 1)
        expect(newState).toContainEqual(action.data)
    })
})