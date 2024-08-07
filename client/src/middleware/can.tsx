import { useDispatch, useSelector } from "react-redux"
import { fecthRolesUser } from "../store/users/roleSlice"
import { ReactElement, useEffect } from "react"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../store/store"

interface CanProps {
  I: string[],
  children: ReactElement
}

function Can({ children, I }: CanProps): JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<any, void, any>>()
  const roles = useSelector(( state: RootState ) => state.roles.roles)
 
  useEffect(() => {
    dispatch(fecthRolesUser())
  }, [])
  
  if (!roles.some(r => I.includes(r))) return (
    <></>
  )

  return (
    <>
      {children}
    </>
  )

}

export { Can }
