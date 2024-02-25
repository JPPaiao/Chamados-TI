import { ListIcon } from "./icons/list"
import { PlusIcon } from "./icons/plus"

function SideBar() {
  return (
		<aside className="px-3 py-4 flex flex-col gap-1 bg-zinc-400">
			<div className="flex flex-col gap-3">
				<h1 className="font-semibold text-2xl">Chamados</h1>
				<nav className="flex flex-col gap-2 text-xl">
					<div className="flex items-center gap-2 px-3 py-1 rounded cursor-pointer hover:bg-zinc-600">
						<PlusIcon width="w-6" />
						<span>Criar</span>
					</div>
					<div className="flex items-center gap-2 px-3 py-1 rounded cursor-pointer hover:bg-zinc-600">
						<ListIcon width="w-6" />
						<span>Chamados</span>
					</div>
				</nav>
			</div>
		</aside>
	)
}

export { SideBar }
