import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./users/userSlice"
import roleSlice from "./users/roleSlice"

export const store = configureStore({
  reducer: {
    users: userSlice,
    roles: roleSlice
  }
})

export type RootState = ReturnType<typeof store.getState>