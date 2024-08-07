import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserTypes {
  token: string,
  email: string,
  username: string,
  id: string,
}

interface InitialStateType {
  user: UserTypes | null,
  auth: boolean
}

const getUserLocalStorage = (): UserTypes | null => {
  const user = localStorage.getItem('userToken')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

const initialState: InitialStateType = {
  user: getUserLocalStorage(),
  auth: getUserLocalStorage() ? true : false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuth: (state, action: PayloadAction<UserTypes>) => {
      state.user = action.payload
      state.auth = true

      localStorage.setItem('userToken', JSON.stringify(action.payload))
    },

    removeAuth: state => {
      state.user = null
      state.auth = false
      
      localStorage.removeItem('userToken')
    },

    userLogged: (state) => {
      const userStorage = getUserLocalStorage()

      state.user = userStorage
      if (!userStorage) {
        state.auth = true
      } else {
        state.auth = false
      }
    }
  }
})

export const { removeAuth, userAuth, userLogged } = userSlice.actions
export default userSlice.reducer
