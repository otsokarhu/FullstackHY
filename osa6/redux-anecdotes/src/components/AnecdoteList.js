import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setThunkNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setThunkNotification(`you voted '${anecdote.content}'`, 5))
  }


  return (
    <div>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>

        </div>
      )}


    </div>
  )
}

export default AnecdoteList