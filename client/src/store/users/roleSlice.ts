import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { httpClientFactory, HttpRequest } from "../../services/server"

interface RolesFetch {
  id: string,
  name: string,
  description: string
}

interface RolesState {
  roles: string[]
}

export const fecthRolesUser = createAsyncThunk("roles/fetchRolesUser", async () => {
  const datas: HttpRequest = {
    method: "get",
    url: `roles/user`,
  }
    
  const response = await httpClientFactory().request(datas)

  return response
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