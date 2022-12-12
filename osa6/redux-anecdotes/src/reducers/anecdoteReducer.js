import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const _ = require('lodash')



const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteUpdate = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...anecdoteUpdate,
        votes: anecdoteUpdate.votes + 1
      }
      state = state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
      return _.orderBy(state, ['votes'], ['desc'])
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
