import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface HistoryState {
  history: string[],
  currentIndex: number
}

const initialState: HistoryState = {
  history: [],
  currentIndex: -1
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    pushState: (state, action: PayloadAction<string>) => {
      if (state.currentIndex < state.history.length - 1) {
        state.history = state.history.slice(0, state.currentIndex + 1)
      }
      state.history.push(action.payload)
      state.currentIndex++
    },

    undoStep: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--
      }
    },

    redoStep: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++
      }
    }
  }
})

export const { pushState, undoStep, redoStep } = historySlice.actions
export default historySlice.reducer