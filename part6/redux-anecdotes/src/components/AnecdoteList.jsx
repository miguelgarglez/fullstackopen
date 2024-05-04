import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <strong> has {anecdote.votes} votes</strong>
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotes = state.anecdotes
    return [...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter)
      )
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(
      setNotification(
        `You voted '${anecdotes.find((a) => a.id === id).content}'`
      )
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
