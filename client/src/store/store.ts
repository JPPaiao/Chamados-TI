import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./users/userSlice"

export const store = configureStore({
  reducer: {
    users: userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>