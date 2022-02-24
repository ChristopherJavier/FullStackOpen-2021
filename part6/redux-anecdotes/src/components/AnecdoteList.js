import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNewNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()    
    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(addVote(anecdote))
        dispatch(setNewNotification(`You voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const  regex = new RegExp(filter, 'i')
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.match(regex))
    
    return (
        <div>
            {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                />
            )}
        </div>
    )
}

export default AnecdoteList