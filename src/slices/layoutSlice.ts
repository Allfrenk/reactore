import { createSlice } from '@reduxjs/toolkit'

type LayoutState = {
  sidebarOpen: boolean
}

const initialState: LayoutState = {
  sidebarOpen: true,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    openSidebar(state) {
      state.sidebarOpen = true
    },
    closeSidebar(state) {
      state.sidebarOpen = false
    },
  },
})

export const { toggleSidebar, openSidebar, closeSidebar } = layoutSlice.actions
export default layoutSlice.reducer
