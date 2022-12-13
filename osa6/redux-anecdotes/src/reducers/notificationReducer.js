import { createSlice } from "@reduxjs/toolkit"

let timeoutID

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
        nullNotification(state, action) {
            return state = ''
        }
    }
})

export const { setNotification, nullNotification } = notificationSlice.actions


export const setThunkNotification = (notification, time) => {
    return async dispatch => {
        dispatch(setNotification(notification))
        clearTimeout(timeoutID)
        timeoutID =
            setTimeout(() => {
                dispatch(nullNotification())
            }, time * 1000)
    }
}


export default notificationSlice.reducer