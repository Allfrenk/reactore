import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type UserRole = 'user' | 'recruiter' | 'demo'

type UserState = {
  user: {
    uid: string
    displayName: string | null
    role: UserRole
    company: string
  } | null
  loading: boolean
  isDemoMode: boolean
}

const initialState: UserState = {
  user: null,
  loading: true,
  isDemoMode: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload
    },
    setDemoMode(state, action: PayloadAction<{ displayName: string; company: string }>) {
      state.isDemoMode = true
      state.loading = false
      state.user = {
        uid: '',
        displayName: action.payload.displayName || 'Guest',
        role: 'demo',
        company: action.payload.company,
      }
    },
    clearUser(state) {
      state.user = null
      state.isDemoMode = false
    },
    setAuthReady(state) {
      state.loading = false
    },
  },
})

export const { setUserAuth, setDemoMode, clearUser, setAuthReady } = userSlice.actions
export default userSlice.reducer
