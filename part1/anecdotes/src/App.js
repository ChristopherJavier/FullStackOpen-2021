import React, { useState } from 'react'

/* This is the button component for display the button.
This is part of the 1.12: anecdotes step1 exercise*/
const Button = ({ text, evHandler }) => {
  
  return(
    <button style={{margin: '0em'}}onClick={evHandler}>{text}</button>
  )
}

/* This is the component that renders the  title of most voted anecdote and the most voted anecdote.
This component search in the array of vote were it's the most voted anecdote and displays it.
This was added in the 1.14: anecdotes step3 exercise*/
const MostVotesDisplay = ({votes, anecdotes}) => {
    const higherVote = votes.indexOf(Math.max(...votes)) 
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[higherVote]}
      <p style={{margin: '0'}}>has {votes[higherVote]} votes</p>
    </div>
    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)

  /* This is the array that have the state of the votes and update the array that copy the state.
  This array has a dinamic length that takes from anecdotes length.
  This is part of the exercises 1.13: anecdotes step2*/
  const [voteCount, addVote] = useState(new Array(anecdotes.length).fill(0))

  /* This is the function that pick the random anecdote and change it for display. 
  This is part of the 1.12: anecdotes step1 exercise*/
  const anecdoteSelector = (nAnecdotes) => {

    let rndNumber = Math.floor(Math.random() * nAnecdotes) + 0
    setSelected(rndNumber)
  }

  /* This is the function that add a vote to the anecdote. 
  It saves the vote in a new  array and take the count of the votes of the state 
  that update the vote count.
  This is part of the exercises 1.13: anecdotes step2*/
  const voteCounter = () => {
    const voteSaver = [...voteCount]
    voteSaver[selected] += 1
    addVote(voteSaver)
    
  }

  /*Here it's renders the vote count of an anecdote, the buttons and the anecdote.
  The button component of next anecdote was added in the 1.12: anecdotes step1 exercise.
  The <p></p> tags and button component with text note were added in the 1.13: anecdotes step2 exercises.
  The MostVoteDisplay component call and h1 with the "anecdote of the day" 
  text were added in the 1.14: anecdotes step3 exercise */

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p style={{margin: '0'}}>has {voteCount[selected]} votes</p>
      <Button text='Vote' evHandler={voteCounter}/>
      <Button text='Next Anecdote' evHandler={() => anecdoteSelector(anecdotes.length) }/>
      <MostVotesDisplay votes={voteCount} anecdotes={anecdotes}/>
    </div>
  )
}

export default App