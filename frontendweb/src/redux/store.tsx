import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'

// Creating Store which takes in Reducer
const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store