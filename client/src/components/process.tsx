import { useState } from "react"
import { PlusCircleIcon } from "./icons/plusCircle" 

interface Process {
	title: string,
	description: string
}

function Process() {
	const [process, setProcess] = useState<Process[]>([
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
		{
			title: 'Titulo',
			description: 'Descrição'
		},
	])



	return (
		<div className="flex gap-2 px-6 py-4 flex-wrap items-center justify-center">
			{
				process.map((p: Process) => (
					<div className="px-3 max-w-96 w-full flex items-center justify-between shadow-md border-green-800 border-2 bg-green-50 target:h-6">
						<div>
							{p.title}
						</div>
						<div className="cursor-pointer">
							<PlusCircleIcon width="w-6" />
						</div>
					</div>			
				))
			}

		</div>
	)
}

export { Process }
