import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { QuestionIcon } from "./icons/question"

function SideBar() {
  return (
		<aside className="py-4 flex justify-center bg-[#00693e] text-white overflow-y-auto h-full">
			<div className="w-48 gap-5 flex flex-col">				
				<div className="px-12 py-1">
					<img className="w-full" src={Logo} alt="Logo Atlantis" />
				</div>
				<div className="flex flex-col gap-1">
					<h2 className="font-semibold text-lg px-3">Processos</h2>
					<nav className="flex flex-col gap-1 text-base hover:bg-[#154430] px-5 py-1 transition-all cursor-pointer">
						<Link to={'/dashboard/processos'}>
							<div className="flex items-center gap-2 px-3 py-[2px]">
								<QuestionIcon width="w-6" />
								<span>Processos</span>
							</div>
						</Link>
					</nav>
				</div>
				<div className="flex flex-col gap-1">
				</div>
			</div>
		</aside>
	)
}

export { SideBar }