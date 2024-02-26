import { Link } from "react-router-dom"
import { ListIcon } from "./icons/list"
import { PlusIcon } from "./icons/plus"
import { QuestionIcon } from "./icons/question"

function SideBar() {
  return (
		<aside className="px-3 py-4 flex flex-col gap-1 bg-green-800 text-white overflow-y-auto h-full">
			<div className="flex flex-col gap-1">
				<h2 className="font-semibold text-xl">Informações</h2>
				<nav className="flex flex-col gap-1 text-lg">
					<Link to={'/processos'}>
						<div className="flex items-center gap-2 px-3 py-[2px]  cursor-pointer hover:bg-green-900 transition-all">
							<QuestionIcon width="w-6" />
							<span>Processos</span>
						</div>
					</Link>
				</nav>
			</div>
			<div className="flex flex-col gap-1">
				<h2 className="font-semibold text-xl">Chamados</h2>
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
				</nav>
			</div>
		</aside>
	)
}

export { SideBar }
