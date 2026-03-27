import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

export interface ThemeState {
  themeDefault: ThemeMode
  themeSelected: ThemeMode | null
}

// ── localStorage helpers ────────────────────────────────────────────────────
const THEME_KEY = 'reactore:theme'

function readPersistedTheme(): ThemeMode | null {
  try {
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'light' || v === 'dark') return v
    return null
  } catch {
    return null
  }
}

function persistTheme(v: ThemeMode): void {
  try { localStorage.setItem(THEME_KEY, v) } catch { /* noop */ }
}

function removePersitedTheme(): void {
  try { localStorage.removeItem(THEME_KEY) } catch { /* noop */ }
}

// ── Slice ───────────────────────────────────────────────────────────────────

const initialState: ThemeState = {
  themeDefault: 'light', // fallback, verrà impostato dal sistema
  themeSelected: readPersistedTheme(), // hydrate from localStorage on startup
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
      persistTheme(action.payload)
    },

    clearThemeSelected(state) {
      state.themeSelected = null
      removePersitedTheme()
    },
  },
})

export const { setThemeDefault, setThemeSelected, clearThemeSelected } =
  themeSlice.actions

export default themeSlice.reducer
