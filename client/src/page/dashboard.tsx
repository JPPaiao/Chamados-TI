import { useEffect, useState } from "react"
import { Header } from "../components/header" 
import { SideBar } from "../components/sideBar" 
import { MagicMotion } from "react-magic-motion"
import { Outlet } from "react-router-dom"

interface Called {
  id: number,
  name: string,
  category: string,
  date: string,
  description: string,
  sector: string,
  status: string,
  subject: string
}

function Dashboard() {
	const [calleds, setCalleds] = useState<Called[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/', {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(d => d.json())
    .then((d: Called[]) => setCalleds(d))
    
  }, [])

	return (
    <MagicMotion>  
      <div className="text-2xl text-black flex flex-col h-screen">
        <Header />
        <div className="flex flex-wrap flex-1">
          <SideBar />
          <div className="flex-1 overflow-y-auto max-h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </MagicMotion>
	)
}

export { Dashboard }
