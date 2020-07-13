import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = ({handler, text}) => {return(<button onClick={handler}>{text}</button>)} 
const StatisticLine = ({stat, value}) =>{
  return (
    <tr>
      <td>{stat}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) =>{
  const all = good + bad + neutral
  const average = ((good-bad)/all).toFixed(2)
  const positives = ((good / all) * 100).toFixed(1) + " %"
  if(all === 0){
    return(
      <div>no feedbacks given</div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine stat='good' value={good} />
            <StatisticLine stat='neutral' value={neutral} />
            <StatisticLine stat='bad' value={bad} />
            <StatisticLine stat='all' value={all} />
            <StatisticLine stat='average' value={average} />
            <StatisticLine stat='positives' value={positives} />
          </tbody>
        </table>
        
 
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodClickHandler = () =>{setGood(good + 1)}
  const neutralClickHandler = () =>{setNeutral(neutral + 1)}
  const badClickHandler = () =>{setBad(bad + 1)}
  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={goodClickHandler} text='good' />
      <Button handler={neutralClickHandler} text='neutral' />
      <Button handler={badClickHandler} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
