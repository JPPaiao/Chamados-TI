import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    email: '',
    username: '',
    id: ''
  },
  reducers: {
    userAuth: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state.username = action.payload.username
      state.id = action.payload.id
    },

    removeAuth: state => {
      state.token = ''
      state.email = ''
      state.username = ''
      state.id = ''
    }
  }
})

export const { removeAuth, userAuth } = userSlice.actions
export default userSlice.reducer
