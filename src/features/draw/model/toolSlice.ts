import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Tool, ToolState } from './types';

const initialState: ToolState = {
  activeTool: 'brush',
};

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setActiveTool: (state, action: PayloadAction<Tool>) => {
      state.activeTool = action.payload;
    },
  },
});

export const { setActiveTool } = toolSlice.actions;
export default toolSlice.reducer;
