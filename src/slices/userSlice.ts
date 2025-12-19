import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  uid: string | null
  displayName: string | null
  firstName: string | null
}

const initialState: UserState = {
  uid: null,
  displayName: null,
  firstName: null,
}

function extractFirstName(displayName: string | null): string | null {
  if (!displayName) return null

  const first = displayName.trim().split(' ')[0]
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase()
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth(
      state,
      action: PayloadAction<{
        uid: string
        displayName: string | null
      }>
    ) {
      state.uid = action.payload.uid
      state.displayName = action.payload.displayName
      state.firstName = extractFirstName(action.payload.displayName)
    },

    clearUser(state) {
      state.uid = null
      state.displayName = null
      state.firstName = null
    },
  },
})

export const { setUserAuth, clearUser } = userSlice.actions
export default userSlice.reducer
