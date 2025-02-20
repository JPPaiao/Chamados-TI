import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  token: string,
  refreshToken: {
    id: string,
    expresIn: number,
    userId: string
  }
  status: boolean,
  user: UserTypes 
}

export interface UserTypes {
  // token: string,
  email: string,
  username: string,
  id: string,
  sectorId?: number,
  refreshToken?: string,
  // roles: Array<object>,
  // permissions: Array<object>
}

interface InitialStateType {
  user: AuthUser | null,
  auth: boolean
}

const getUserLocalStorage = (): AuthUser | null => {
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
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.auth = true

      localStorage.setItem('userToken', JSON.stringify(action.payload))
    },

    logout: state => {
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

export const { logout, login, userLogged } = userSlice.actions
export default userSlice.reducer
