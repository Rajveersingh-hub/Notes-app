import { configureStore } from '@reduxjs/toolkit'
import pastesliceReducer from '../features/counterslice/counterslice.jsx'

export const store = configureStore({
  reducer: {
    paste: pastesliceReducer,
  },
})