import { useSelector } from "react-redux"
import { Navigate, Outlet, redirect, useLoaderData } from "react-router-dom"
import { RootState, store } from "../store/store"
import { httpClientFactory, HttpRequest } from "../services/server"

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

  if (!user) return redirect('/')

  const datas: HttpRequest = {
		method: "get",
		url: "roles/user",
	}

  const response = await httpClientFactory().request(datas) as RolesUser[]
  const rolesName = response.map(r => r.name)

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