import { Header } from "../components/header" 
import { SideBar } from "../components/sideBar" 
import { Outlet, redirect } from "react-router-dom"
import { store } from "../store/store"
import { userLogged } from "../store/users/userSlice"

async function loader() {
  userLogged()
  const userAuth = store.getState().users.auth

  if (!userAuth) {
    return redirect('/')
  }
  return null
}

function Dashboard() {
	return (
    <div className="text-2xl text-black flex flex-col h-screen">
      <div className="flex flex-wrap flex-1">
      <SideBar />
        <div className="flex-1 overflow-y-auto max-h-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
	)
}

export { Dashboard, loader }
