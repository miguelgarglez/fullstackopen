import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, seconds: 0 },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return { message: null, seconds: 0 }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
