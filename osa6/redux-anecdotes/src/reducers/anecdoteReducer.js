import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const _ = require('lodash')



const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteHereAnecdote(state, action) {
      const uAnecdote = action.payload
      state = state.map(anecdote => anecdote.id !== uAnecdote.id ? anecdote : uAnecdote)
      return _.orderBy(state, ['votes'], ['desc'])
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return _.orderBy(action.payload, ['votes'], ['desc'])
    }
  }
})

export const { voteHereAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = (anecdote) => {
  console.log(anecdote);
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    }
    )
    dispatch(voteHereAnecdote(updatedAnecdote))
  }
}

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
