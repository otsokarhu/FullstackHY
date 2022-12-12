import { createSlice } from "@reduxjs/toolkit"

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
export default notificationSlice.reducer