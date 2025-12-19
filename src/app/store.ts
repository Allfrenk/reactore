import layoutReducer from '@/slices/layoutSlice'
import themeReducer from '@/slices/themeSlice'
import userReducer from '@/slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
