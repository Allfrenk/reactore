import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import hooksReducer, { updateHookValue, type HooksState } from '@/state/hooksSlice'
import layoutReducer from '@/state/layoutSlice'
import themeReducer from '@/state/themeSlice'
import userReducer from '@/state/userSlice'

import { updateUserHooks } from '@/features/users/users.repository'

const hooksSyncListener = createListenerMiddleware()

let saveTimer: number | null = null

hooksSyncListener.startListening({
  actionCreator: updateHookValue,
  effect: (_action, api) => {
    const state = api.getState() as {
      user: { user: { uid: string } | null }
      hooks: { data: HooksState['data']; hydrated: boolean }
    }

    const uid = state.user.user?.uid
    const hydrated = state.hooks.hydrated

    if (!uid || !hydrated) return

    // 🔁 Debounce 1s
    if (saveTimer) {
      window.clearTimeout(saveTimer)
    }

    saveTimer = window.setTimeout(() => {
      const latestState = api.getState() as {
        user: { user: { uid: string } | null }
        hooks: { data: HooksState['data'] }
      }

      const latestUid = latestState.user.user?.uid
      if (!latestUid) return

      void updateUserHooks(latestUid, latestState.hooks.data)
    }, 1000)
  },
})

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducer,
    user: userReducer,
    hooks: hooksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(hooksSyncListener.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
