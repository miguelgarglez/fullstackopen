/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function all() {
    const total = good + neutral + bad
    return total
  }

  function average() {
    const avg = (good - bad) / all()
    if (isNaN(avg)) {
      return 0
    }
    return avg
  }

  function positive() {
    const positive = (good / all()) * 100
    if (isNaN(positive)) {
      return 0
    }
    return positive
  }

  return (
    <>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <Header text='statistics' />

      <Statistics good={good} neutral={neutral} bad={bad} all={all()} average={average()} positive={positive()} />
      
    </>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text='good' value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text='neutral' value={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text='bad' value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text='all' value={all} /></td>
          </tr>
          <tr>
            <td><StatisticLine text='average' value={average} /></td>
          </tr>
          <tr>
            <td><StatisticLine text='positive' value={positive + '%'} /></td>
          </tr>
        </tbody>
      </table>
    </>
  )

}

const StatisticLine = ({ text, value }) => (
  <p>{text} {value}</p>
)

export default App