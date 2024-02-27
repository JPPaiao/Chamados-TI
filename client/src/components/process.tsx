import { useState } from "react"
import { PlusCircleIcon } from "./icons/plusCircle" 

interface Process {
	title: string,
	description: string
}

function Process() {
	const [process, setProcess] = useState<Process[]>([
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
		{
			title: 'Título',
			description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem v vvlorem lorem  loremv lorem lorem lorem loremlorem lorem'
		},
	])
	const [openCards, setOpenCards] = useState<boolean[]>(Array(process.length).fill(false))
	const [newProcess, setNewProcess] = useState<string>()

	const toggleAddProcess = () => {
		// setProcess([])
	}

  const toggleCard = (index: number) => {
    const updatedOpenCards = [...openCards]
    updatedOpenCards[index] = !updatedOpenCards[index]
    setOpenCards(updatedOpenCards)
  }

	return (
		<div className="flex gap-4 px-6 py-4 flex-wrap items-center justify-center">
			<form className="flex justify-around w-full text-base">
				<input onChange={(e) => setNewProcess(e.target.value)} type="text" placeholder="Título" className="px-2 outline-none border-b-2 border-green-800" />
				<input onClick={() => toggleAddProcess()} type="button" value="Adicionar processo" className="px-3 cursor-pointer hover:bg-green-800 hover:text-white transition-all shadow-md border-green-800 border-2 bg-green-50" />
			</form>
			<div className="flex gap-2 py-3 flex-wrap items-center justify-center">
				{
					process.map((process: Process, index: number) => (
						<div key={process.title} className={`px-3 max-w-96 w-full flex flex-col items-center justify-between shadow-md border-green-800 border-2 bg-green-50 ${
								!openCards[index] ? 'h-auto' : 'h-auto'
							}`}>
								<div className="w-full flex items-center justify-between">
									<div className="text-lg flex-initial">
										{process.title}
									</div>
									<div 
										className="cursor-pointer "
										onClick={() => toggleCard(index)}	
										>
										<PlusCircleIcon width="w-6" />
									</div>
								</div>
							{openCards[index] && (
								<div className="text-base py-1">
									{process.description}
								</div>
							)}
						</div>			
					))
				}
			</div>
		</div>
	)
}

export { Process }
