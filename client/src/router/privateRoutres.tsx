import { useSelector } from "react-redux"
import { RootState } from "../store/store"
// import { redirect, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"

interface PrivateRoutesProps {
  role?: string
}

const PrivateRoutes = ({ role, ...res }: PrivateRoutesProps) => {
  const userLogged = useSelector(( state: RootState ) => state.users.user)
  const [roles, setRoles] = useState<string[]>([])

  // useEffect(() => {
  //   async function loadRoles() {
  //     const response = fetch('http://localhost:3000/api/roles/user', {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json, multipart/form-data, application/pdf",
  //         "authorization": userLogged?.token as string
  //       },
  //     }).then(d => d.json())

  //     // const findRole = response.
  //     console.log(response)
  //   }
  // }, [])
  
  // if (!userLogged) {
  //   return redirect('/')
  // }

  // if (!role && userLogged) {
  //   return <Routes {...res} />
  // }
  
  // return userLogged ? <Routes  {...res} /> : redirect('/')
}

export { PrivateRoutes }