import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type HookValue = {
  value: string
}

export type HooksState = {
  data: {
    useState: HookValue
    useEffect: HookValue
    useMemo: HookValue
    useCallback: HookValue
  }
  hydrated: boolean
}

const initialState: HooksState = {
  data: {
    useState: { value: '0' },
    useEffect: { value: '0' },
    useMemo: { value: '0' },
    useCallback: { value: '0' },
  },
  hydrated: false,
}

const hooksSlice = createSlice({
  name: 'hooks',
  initialState,
  reducers: {
    hydrateHooks(state, action: PayloadAction<HooksState['data']>) {
      state.data = action.payload
      state.hydrated = true
    },
    updateHookValue(
      state,
      action: PayloadAction<{ hook: keyof HooksState['data']; value: string }>
    ) {
      state.data[action.payload.hook].value = action.payload.value
    },
    clearHooks(state) {
      state.data = initialState.data
      state.hydrated = false
    },
  },
})

export const { hydrateHooks, updateHookValue, clearHooks } = hooksSlice.actions
export default hooksSlice.reducer
