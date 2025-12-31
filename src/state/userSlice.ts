import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  user: {
    uid: string
    displayName: string | null
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
