import anecdoteService from '../services/anecdotes'

const anecdotesReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(
        anecdote => anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'NEW_VOTE',
      data: updateAnecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdotesReducer