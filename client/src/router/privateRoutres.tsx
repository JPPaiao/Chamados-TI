import { useSelector } from "react-redux"
import { Navigate, Outlet, useLoaderData } from "react-router-dom"
import { RootState, store } from "../store/store"

interface PrivateRoutesProps {
  role?: string[],
}

interface RolesUser {
  id: string,
  name: string,
  description: string,
}

async function loader() {
  const user = store.getState().users.user
  const rolesUser = await fetch('http://localhost:3000/api/roles/user', {
    method: 'get',
    headers: {
      "authorization": user?.token as string
    },
  }).then(r => r.json()) as RolesUser[]

  const rolesName = rolesUser.map(r => r.name)

  return rolesName
}

const PrivateRoutes = ({ role }: PrivateRoutesProps) => {
  const rolesName = useLoaderData() as string[]
  const user = useSelector((state: RootState) => state.users.user)
  
  if (!user) {
    return <Navigate to={"/"} />
  }
  
  if (role) {    
    if (rolesName.length === 0 ||  !rolesName.some(r => role.includes(r))) {
      return <Navigate to={"/dashboard/unauthorized"} />
    }
  }
  
  return (
    <Outlet />
  )
}

export { PrivateRoutes, loader }