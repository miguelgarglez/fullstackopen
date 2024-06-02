import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    users: userReducer,
    user: loginReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

export default store
