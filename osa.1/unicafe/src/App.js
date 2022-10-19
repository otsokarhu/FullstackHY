import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (

      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>

    )
  }

  return (

    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>

  )
}


const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given</div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={props.good} text='good' />
          <StatisticLine value={props.neutral} text='neutral' />
          <StatisticLine value={props.bad} text='bad' />
          <StatisticLine value={props.good + props.neutral + props.bad} text='all' />
          <StatisticLine value={(props.good * 1 + props.bad * -1) / (props.good + props.neutral + props.bad)} text='average' />
          <StatisticLine value={(props.good / (props.good + props.neutral + props.bad)) * 100} text='positive' />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App