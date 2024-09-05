import { Header } from "../components/header" 
import { SideBar } from "../components/sideBar" 
import { Outlet, redirect, useLoaderData } from "react-router-dom"
import { store } from "../store/store"
import { userLogged } from "../store/users/userSlice"

async function loader() {
  await userLogged()
  const userAuth = store.getState().users

  return !userAuth.auth ? userAuth.user : null
}

function Dashboard() {
  const user = useLoaderData()

	return (
    <div className="text-2xl text-black flex flex-col h-screen">
      <div className="flex flex-wrap flex-1">
      <SideBar />
        <div className="flex-1 overflow-y-auto max-h-full ml-48">
          <Header />
          <div className="px-3 py-2">
            <Outlet context={user} />
          </div>
        </div>
      </div>
    </div>
	)
}

export { Dashboard, loader }
