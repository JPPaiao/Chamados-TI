import { useEffect, useState } from "react"
import { Header } from "../components/header" 
import { SideBar } from "../components/sideBar" 

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
		<div className="h-full">
			<Header />
      <div className="flex gap-6">
        <SideBar />
        <div>
          content
        </div>
      </div>
		</div>
	)
}

export { Dashboard }
