import { Header } from "../components/header" 
import { SideBar } from "../components/sideBar" 
import { Outlet } from "react-router-dom"

function Dashboard() {
	return (
    <div className="text-2xl text-black flex flex-col h-screen">
      <div className="flex flex-wrap flex-1">
      <SideBar />
        <div className="flex-1 overflow-y-auto max-h-full ml-48">
          <Header />
          <div className="px-3 py-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
	)
}

export { Dashboard }
