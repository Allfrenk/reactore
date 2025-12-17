import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'themeMode'

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode
}

function applyThemeToDom(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function loadMode(): ThemeMode {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  return 'system'
}

export interface ThemeState {
  mode: ThemeMode
  resolvedMode: ResolvedTheme
}

const initialMode = loadMode()
const initialResolved = resolveTheme(initialMode)
applyThemeToDom(initialResolved)

const initialState: ThemeState = {
  mode: initialMode,
  resolvedMode: initialResolved,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
      localStorage.setItem(STORAGE_KEY, state.mode)
      state.resolvedMode = resolveTheme(state.mode)
      applyThemeToDom(state.resolvedMode)
    },
    toggleTheme(state) {
      const next: ThemeMode = state.resolvedMode === 'dark' ? 'light' : 'dark'
      state.mode = next
      localStorage.setItem(STORAGE_KEY, state.mode)
      state.resolvedMode = resolveTheme(state.mode)
      applyThemeToDom(state.resolvedMode)
    },
    syncSystemTheme(state) {
      if (state.mode !== 'system') return
      state.resolvedMode = getSystemTheme()
      applyThemeToDom(state.resolvedMode)
    },
  },
})

export const { setMode, toggleTheme, syncSystemTheme } = themeSlice.actions
export default themeSlice.reducer
