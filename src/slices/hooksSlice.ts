// src/features/hooksSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HooksState {
  useStateValue: string
  useRefValue: number
  useEffectLastTime: string
  useMemoInput: number
  useMemoResult: number
  useCallbackCount: number
  useReducerCount: number
}

const initialState: HooksState = {
  useStateValue: '',
  useRefValue: 0,
  useEffectLastTime: '',
  useMemoInput: 0,
  useMemoResult: 0,
  useCallbackCount: 0,
  useReducerCount: 0,
}

export const hooksSlice = createSlice({
  name: 'hooks',
  initialState,
  reducers: {
    setUseStateValue: (state, action: PayloadAction<string>) => {
      state.useStateValue = action.payload
    },
    setRefValue: (state, action: PayloadAction<number>) => {
      state.useRefValue = action.payload
    },
    setEffectTime: (state, action: PayloadAction<string>) => {
      state.useEffectLastTime = action.payload
    },
    setUseMemoInput(state, action) {
      state.useMemoInput = action.payload
    },
    setUseMemoResult(state, action) {
      state.useMemoResult = action.payload
    },
    setCallbackCount: (state, action: PayloadAction<number>) => {
      state.useCallbackCount = action.payload
    },
    setReducerCount: (state, action: PayloadAction<number>) => {
      state.useReducerCount = action.payload
    },
  },
})

export const {
  setUseStateValue,
  setRefValue,
  setEffectTime,
  setUseMemoInput,
  setUseMemoResult,
  setCallbackCount,
  setReducerCount,
} = hooksSlice.actions

export default hooksSlice.reducer
