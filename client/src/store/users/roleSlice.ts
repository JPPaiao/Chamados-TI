import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";

interface RolesFetch {
  id: string,
  name: string,
  description: string
}

interface RolesState {
  roles: string[]
}

export const fecthRolesUser = createAsyncThunk("roles/fetchRolesUser", async () => {
  const user = store.getState().users.user
  const response = await fetch('http://localhost:3000/api/roles/user', {
    method: 'get',
    headers: {
      "authorization": user?.token as string
    }
  })

  return response.json()
})

const initialState: RolesState = {
  roles: []
}

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fecthRolesUser.fulfilled, (state, action: PayloadAction<RolesFetch[]>) => {
      const rolesFetch = action.payload.map(r => r.name)
      state.roles = rolesFetch
    })
  },
  reducers: {
    verifyRoles: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload
    }
  }
})

export const { verifyRoles } = roleSlice.actions
export default roleSlice.reducer