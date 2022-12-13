import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setThunkNotification } from '../reducers/notificationReducer'
import { connect } from "react-redux";


const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNewAnecdote(anecdote)

        props.setThunkNotification(`you created '${anecdote}'`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createNewAnecdote,
    setThunkNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm