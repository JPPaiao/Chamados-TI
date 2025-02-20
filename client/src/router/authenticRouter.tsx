import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate } from "react-router"
import { logout } from "../store/users/userSlice"

function AuthenticRouter({ children }) {
  const user = useSelector((state: RootState) => state.users.user)
  const dispatch = useDispatch()

  if (!user) {
    dispatch(logout())
    
    return (
      <Navigate to={'/'} />
    )
  }
  
  return children
}

export { AuthenticRouter }