import { useEffect, useState } from "react"
import { PlusCircleIcon } from "./icons/plusCircle"
import { RootState } from "../store/store"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

interface Process {
	id: string,
	title: string,
	description: string,
	author: string,
	sector: string,
	pdfId: string
	pdfName: string,
	URL: string	
}

interface Response {
	id: string | undefined,
	message: string | undefined
}

function Process() {
	const tokenUser = useSelector((state: RootState) => state.users.token)
	const navigate = useNavigate()
	if (!tokenUser) {
    navigate('/')
  }

	const [process, setProcess] = useState<Process[]>([])
	const [openCards, setOpenCards] = useState<boolean[]>(Array(process.length).fill(false))
	const [newProcess, setNewProcess] = useState<string>()
	const [newPDF, setNewPDF] = useState<File | null>(null)
	const [responseMessage, setResponseMessage] = useState<Response>({
		id: undefined,
		message: undefined
	})

	useEffect(() => {
		fetch('http://localhost:3000/api/procedures', {
			method: "get",
			headers: {
				"Content-Type": "application/json, multipart/form-data, application/pdf",
				"authorization": tokenUser
			},
		}).then(data => data.json())
    .then((data: Process[]) => {
			setProcess(data)
		})
	}, [responseMessage])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setNewPDF(e.target.files[0])
		}
	}
	
	const toggleAddProcess = async (e: any) => {
		e.preventDefault()

		if (newProcess && newPDF) {
			const formDataToSend: any = new FormData()
			formDataToSend.append('title', newProcess)
			formDataToSend.append('description', 'descrição')
			formDataToSend.append('author', 'autor')
			formDataToSend.append('sector', 'setor')
			formDataToSend.append('pdfName', newPDF?.name)
			formDataToSend.append('pdf', newPDF as File)
			
			const formResponse = await fetch('http://localhost:3000/api/procedures/create', {
				method: 'post',
				body: formDataToSend,
				headers: {
					"authorization": tokenUser
				},
			})
			.then(d => d.json())

			setResponseMessage(formResponse as Response)
		}
	}

  const toggleCard = (index: number) => {
    const updatedOpenCards = [...openCards]
    updatedOpenCards[index] = !updatedOpenCards[index]
    setOpenCards(updatedOpenCards)
  }

	return (
		<div className="flex gap-4 px-6 py-4 flex-wrap items-center justify-center flex-co">
			{/* {responseMessage.message && ( 
				<div className="absolute text-xl bg-green-400 border-2 border-black text-black shadow px-3 py-1">
					{responseMessage.message}
				</div>
			)} */}
			<form className="flex justify-around w-full text-sm" onSubmit={(e) => toggleAddProcess(e)}>
				<input onChange={(e) => setNewProcess(e.target.value)} type="text" placeholder="Título" className="px-2 outline-none border-b-2 border-green-800" />
				<input onChange={(e) => handleFileChange(e)} type="file" placeholder="PDF" className="pr-2 outline-none border-b-2 border-green-800 cursor-pointer" />
				<input type="submit" value="Adicionar processo" className="px-3 cursor-pointer hover:bg-green-800 hover:text-white transition-all shadow-md border-green-800 border-2 bg-green-50" />
			</form>
			<div className="flex gap-2 py-3 flex-wrap items-center justify-center w-full">
				{
					process.map((process: Process, index: number) => (
						<div key={process.id} className={`px-3 max-w-96 w-full flex flex-col items-center justify-between shadow-md border-green-800 border-2 bg-green-50 ${
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
									<div>
										<a href={process.URL} target="_blank" >{process.pdfName}</a>
									</div>
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
