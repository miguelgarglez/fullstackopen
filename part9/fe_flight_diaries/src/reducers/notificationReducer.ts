import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface NotificationState {
  message: string | null
  seconds: number
}

const initialState: NotificationState = {
    message: null,
    seconds: 0,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(_state, action: PayloadAction<NotificationState>) {
      return action.payload
    },
    clearNotification() {
      return { message: null, seconds: 0 }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
