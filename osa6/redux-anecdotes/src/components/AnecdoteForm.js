import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, nullNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''


        dispatch(createNewAnecdote(anecdote))

        dispatch(setNotification(`anecdote with content '${anecdote}' was created`))
        setTimeout(() => {
            dispatch(nullNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm