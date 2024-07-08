import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { ListIcon } from "./icons/list"
import { PlusIcon } from "./icons/plus"
import { QuestionIcon } from "./icons/question"

function SideBar() {
  return (
		<aside className="py-4 flex justify-center bg-[#00693e] text-white overflow-y-auto h-full">
			<div className="w-48 gap-5 flex flex-col">				
				<div className="px-14 py-1">
					<img className="w-full" src={Logo} alt="Logo Atlantis" />
				</div>
				<div className="flex flex-col gap-1">
					<h2 className="font-semibold text-lg px-3">Processos</h2>
					<nav className="flex flex-col gap-1 text-base hover:bg-[#154430] px-5 transition-all cursor-pointer">
						<Link to={'/dashboard/processos'}>
							<div className="flex items-center gap-2 px-3 py-[2px]">
								<QuestionIcon width="w-6" />
								<span>Processos</span>
							</div>
						</Link>
					</nav>
				</div>
				<div className="flex flex-col gap-1">
					{/* <h2 className="font-semibold text-xl">Chamados</h2>
					<nav className="flex flex-col gap-[2px] text-lg">
						<Link to={'/'}>
							<div className="flex items-center gap-2 px-3 py-[2px]  cursor-pointer hover:bg-green-900 transition-all">
								<PlusIcon width="w-6" />
								<span>Criar</span>
							</div>
						</Link>
						<Link to={'/chamados'}>
							<div className="flex items-center gap-2 px-3 py-[2px]  cursor-pointer hover:bg-green-900 transition-all">
								<ListIcon width="w-6" />
								<span>Chamados</span>
							</div>
						</Link>
					</nav> */}
				</div>
			</div>
		</aside>
	)
}

export { SideBar }
