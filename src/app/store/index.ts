import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "@/features/draw/model/toolSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
