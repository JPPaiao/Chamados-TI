import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { ListIcon } from "./icons/list"
import { PlusIcon } from "./icons/plus"
import { QuestionIcon } from "./icons/question"

function SideBar() {
  return (
		<aside className="py-4 flex flex-col justify-start gap-5 bg-zinc-700 text-white overflow-y-auto h-full">
			<div className="px-8 py-1">
				<img className="w-20" src={Logo} alt="Logo Atlantis" />
			</div>
			<div className="flex flex-col gap-1">
				<h2 className="font-semibold text-lg px-3">Informações</h2>
				<nav className="flex flex-col gap-1 text-base hover:bg-zinc-900 px-5 transition-all cursor-pointer">
					<Link to={'/processos'}>
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
		</aside>
	)
}

export { SideBar }
