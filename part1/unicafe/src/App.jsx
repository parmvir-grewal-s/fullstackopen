import { useState } from 'react'

const Header = ({heading}) => <h1>{heading}</h1>

const Statistics = (props) =>{

  if (props.total === 0) return <div>No feedback given</div>
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="total" value={props.total} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    <h1>table</h1>
      <table>
        <tbody>
        <tr><td>good</td><td>{props.good}</td></tr>
        <tr><td>neutral</td><td>{props.neutral}</td></tr>
        <tr><td>bad</td><td>{props.bad}</td></tr>
        <tr><td>total</td><td>{props.total}</td></tr>
        <tr><td>average</td><td>{props.average}</td></tr>
        <tr><td>positive</td><td>{props.positive}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)
  const positive = (good / total) * 100

  return (
    <div>
      <Header heading="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header heading="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App