import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

export interface ThemeState {
  themeDefault: ThemeMode
  themeSelected: ThemeMode | null
}

const initialState: ThemeState = {
  themeDefault: 'light', // fallback, verrà impostato dal sistema
  themeSelected: null,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeDefault(state, action: PayloadAction<ThemeMode>) {
      state.themeDefault = action.payload
    },

    setThemeSelected(state, action: PayloadAction<ThemeMode>) {
      state.themeSelected = action.payload
    },

    clearThemeSelected(state) {
      state.themeSelected = null
    },
  },
})

export const { setThemeDefault, setThemeSelected, clearThemeSelected } =
  themeSlice.actions

export default themeSlice.reducer
