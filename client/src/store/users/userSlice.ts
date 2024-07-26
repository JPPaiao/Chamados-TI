import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserTypes {
  token: string,
  email: string,
  username: string,
  id: string,
  // role: string
}

interface InitialStateType {
  user: UserTypes | null
}

const getUserLocalStorage = (): UserTypes => {
  const user = localStorage.getItem('userToken')
  return user ? JSON.parse(user) : null
}

const initialState: InitialStateType = {
  user: getUserLocalStorage()
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuth: (state, action: PayloadAction<UserTypes>) => {
      state.user = action.payload

      localStorage.setItem('userToken', JSON.stringify(action.payload))
    },

    removeAuth: state => {
      state.user = null

      localStorage.removeItem('userToken')
    },

    userLogged: () => {
      const userStorage = getUserLocalStorage()

      if (!userStorage) {
        initialState.user = userStorage
      }
    }
  }
})

export const { removeAuth, userAuth, userLogged } = userSlice.actions
export default userSlice.reducer
