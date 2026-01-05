import hooksReducer from '@/state/hooksSlice'
import layoutReducer from '@/state/layoutSlice'
import themeReducer from '@/state/themeSlice'
import userReducer from '@/state/userSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducer,
    user: userReducer,
    hooks: hooksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
