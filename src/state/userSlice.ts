import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type UserRole = 'user' | 'recruiter'

type UserState = {
  user: {
    uid: string
    displayName: string | null
    role: UserRole
    company: string
  } | null
  loading: boolean
}

const initialState: UserState = {
  user: null,
  loading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    setAuthReady(state) {
      state.loading = false
    },
  },
})

export const { setUserAuth, clearUser, setAuthReady } = userSlice.actions
export default userSlice.reducer
