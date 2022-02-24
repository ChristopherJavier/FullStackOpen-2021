import filterReducer, { initialState } from "./filterReducer";
import deepFreeze from "deep-freeze";

describe('FilterReducer', () => { 

    test(`return it's initial state when receive no defined action`, () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = filterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('the state changes with the SET_FILTER', () => {
        const filter = 'First Filter'
        
        const action = {
            type: 'SET_FILTER',
            data: {
                filter: filter
            }
        }

        const state = initialState
        deepFreeze(state)
        const newState = filterReducer(state, action)
        expect(newState).toEqual(filter)
    })

    test(`The state change to the initial state with the CLEAR_FILTER`, () => {
        const action = {
            type: 'CLEAR_FILTER'
        }

        const newState = filterReducer(initialState, action)
        expect(newState).toEqual(initialState)
    })
})