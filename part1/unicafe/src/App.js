import React, { useState } from 'react'

/* This is the component that renders the title */
const Header = ({title}) => {
  return(
    <div>
      <h1>{title}</h1>
    </div>
  )
}

/* This is the component that renders the buttons 
and were the events of the buttons can be executed.
And is part of the 1.10: unicafe step 5 exercise*/
const Button = ({ eventHandlerG, eventHandlerN, eventHandlerB }) => {
  const text = ['Good', 'Neutral', 'Bad']

  return(
    <div>
      <button onClick={eventHandlerG}>{text[0]}</button>
      <button onClick={eventHandlerN}>{text[1]}</button>
      <button onClick={eventHandlerB}>{text[2]}</button>
    </div>
  )
}

/* In this component are display all the total number
of feedback on every category(good, neutral or bad).
Here are render the title of statistics and the
number of stats (Good, Neutral, Bad, All, Average and Positive).
The Stat of every category is display by getting the props sent 
by the call in the App component.
*/

/* This is the Statistics the refactor component of the statistics by it own.
This is part of the 1.8: unicafe step 3 exercises*/
const Statistics = ({ text, value }) => {

    return(
      <div>
        {/* Here as is mention on the exercise 1.11, 
        the statistics is now displayed in an HTML Table.
        And is part of the 1.11: unicafe step6 exercise.
        Note: The console warning was fixed adding a 
        tbody tag to the table.*/}
        <table style={{width: '15%'}}>
          <tbody>
          <tr>
            <td style={{width: '50%'}}>{text}</td>
            <td style={{width: '50%'}}>{value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ) 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /* allStats was created for store the total number of collected feedback.
  It is part of the 1.7: unicafe Step2 exercise
  */
  let allStats = 0
  allStats = good + neutral + bad

/* these are the functions that add the
 points to the different types of feedback */
  const addGoodClick = () => setGood(good + 1)

  const addNeutralClick = () => setNeutral(neutral + 1)

  const addBadClick = () => setBad(bad + 1)

  /* averageStat and positiveStat were created for calculate 
  the avg of the stats and the percentage of positive number of feedback respectively.
  This two functions are part of the 1.7 exercise*/
  const averageStat = () => (good - bad) / allStats
  
  const positiveStat = () => {
    let positiveSR = 0
    positiveSR = (good / allStats) * 100
    return (
      positiveSR = positiveSR.toString() + '%'
    )
  }

  /* This is the exercise 1.9: unicafe step 4 improvement */
  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <>
      <Header title='Give feedback'/>
      <Button eventHandlerG={addGoodClick} eventHandlerN={addNeutralClick} eventHandlerB={addBadClick}/>
      <h2>Statistics</h2>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <div>
      {/* Here the different calls of the components 
      and the data send to every one 
      Note: eventHandlerG, EventHandleN and eventHandlerB 
      are to make that Buttons on Button component can 
      execute the functions on that component
      */}
      <Header title='Give feedback'/>
      <Button eventHandlerG={addGoodClick} eventHandlerN={addNeutralClick} eventHandlerB={addBadClick}/>
      <h2>Statistics</h2>
      <Statistics text="good" value={good}/>
      <Statistics text="neutral" value={neutral}/>
      <Statistics text="bad" value={bad}/>
      <Statistics text="all" value={allStats}/>
      <Statistics text="average" value={averageStat()}/>
      <Statistics text="positive" value={positiveStat()}/>
      {/* Here are send the averageStat and positiveStat 
      functions results as props for the Statistics component 
      This block of Statistics component calls is the way as the 1.10 exercise requires.
      And is part of the 1.10: unicafe step 5 exercise,
      where the text and value of the statistics are send like props*/}
    </div>
  )
}

export default App