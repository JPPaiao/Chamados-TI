import { Header } from "../components/header" 
import { SideBar } from "../components/sideBar" 
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

function Dashboard() {
  const userAuth = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()

  if (!userAuth.token) {
    navigate('/')
  }

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

export { Dashboard }
