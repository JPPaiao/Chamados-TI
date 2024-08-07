import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { QuestionIcon } from "./icons/question"
import { ListIcon } from "./icons/list"
import { Can } from "../middleware/can"

function SideBar() {
  return (
		<aside className="py-4 flex justify-center bg-[#00693e] text-white overflow-y-auto h-full">
			<div className="w-48 gap-5 flex flex-col">				
				<div className="px-12 py-1">
					<Link to={"/dashboard"}>
						<img className="w-full" src={Logo} alt="Logo Atlantis" />
					</Link>
				</div>
				<div className="flex flex-col ">
					<h2 className="font-semibold text-lg px-3">Processos</h2>
					<nav className="flex flex-col gap-1 text-base hover:bg-[#154430] px-4 py-1 transition-all cursor-pointer">
						<Link to={'/dashboard/process'}>
							<div className="flex items-center gap-2 px-3 py-[2px]">
								<QuestionIcon width="w-5" />
								<span>Processos</span>
							</div>
						</Link>
					</nav>
					<Can I={['admin']} 
						children={(
							<nav className="flex flex-col gap-1 text-base hover:bg-[#154430] px-4 py-1 transition-all cursor-pointer">
								<Link to={'/dashboard/admin'}>
									<div className="flex items-center gap-2 px-3 py-[2px]">
										<ListIcon width="w-5" />
										<span>Administração</span>
									</div>
								</Link>
							</nav>
						)}
					>
					</Can>
				</div>
				<div className="flex flex-col gap-1">
				</div>
			</div>
		</aside>
	)
}

export { SideBar }