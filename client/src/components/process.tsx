import { useState } from "react"
import { PlusCircleIcon } from "./icons/plusCircle"
import { store } from "../store/store"
import { Link, redirect, useLoaderData } from "react-router-dom"
import { TrashIcon } from "./icons/trash"
import { Modal } from "./modal"
import { Can } from "../middleware/can"
import { userLogged, UserTypes } from "../store/users/userSlice"
const url = import.meta.env.SERVER_API

interface ProcessTypes {
	id: string,
	title: string,
	description: string,
	author: string,
	sector: string,
	pdfId: string
	pdfName: string,
	URL: string
}

interface LoaderTypes {
	process: ProcessTypes[],
	user: UserTypes
}

async function loader() {
	userLogged()
	const user = store.getState().users
	const response = await fetch(`http://localhost:3000/api/procedures`, {
		method: "get",
		headers: {
			"Content-Type": "application/json, multipart/form-data, application/pdf",
			"authorization": user?.user?.token as string
		},
	}).then(data => data.json())

	if (!user.auth) {
		return redirect('/')
	}

	return {
		process: response ? response : null,
		...user 
	}
}

function Process() {
	const processLoader = useLoaderData() as LoaderTypes
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [modalAction, setModalAction] = useState(false)
	const [modalMenssage, setModalMenssage] = useState("")
	
	const process: ProcessTypes[] | null = processLoader.process
	const [openCards, setOpenCards] = useState<boolean[]>(Array(process?.length).fill(false))
	const [processDelet, setProcessDelet] = useState<ProcessTypes | null>(null)


	const toggleCard = (index: number) => {
		const updatedOpenCards = [...openCards]
		updatedOpenCards[index] = !updatedOpenCards[index]
		setOpenCards(updatedOpenCards)
	}

	const toggleDeleteProcess = async () => {
		const idDelete = processDelet?.id

		if (idDelete === null) return closeModal()
			await fetch(`http://localhost:3000/api/procedures/delete/${idDelete}`, {
				method: 'delete',
				headers: {
					"authorization": processLoader.user?.token as string
				},
		}).then(d => d.json())

		handleOpenSucessoModal(`Processo ${processDelet?.title}, deletado com sucesso!`)

		setTimeout(() => {
			closeModal()
		}, 2000)
	}

	const handleOpenSucessoModal = (menssage: string) => {
		setModalMenssage(menssage)
		setModalAction(false)
		openModal()

		setTimeout(() => {
			closeModal()
		}, 1000)
	}

	const handleOpenDeleteModal = (process: ProcessTypes) => {
		setProcessDelet(process)
		setModalMenssage("Tem certeza que deseja excluir?")
		setModalAction(true)
		openModal()
	}

	const openModal = () => {
		setModalIsOpen(true) 
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}

	return (
		<div className="flex gap-4 px-6 py-4 flex-wrap items-center justify-center flex-col">
			<Modal mensagen={modalMenssage} actionType={modalAction} isOpen={modalIsOpen} onCancel={closeModal} onConfirm={toggleDeleteProcess} />
			<div className="flex justify-end">
				<Can I={['admin']}>
					<Link to={"/dashboard/add/addProcess"} className="px-3 text-base cursor-pointer hover:bg-green-800 hover:text-white transition-all shadow-md border-green-800 border-2 bg-green-50">
						Adicionar processo
					</Link>
				</Can>
			</div>
			<div className="flex gap-2 flex-wrap items-center justify-center w-full">
				{
					process?.map((process: ProcessTypes, index: number) => (
						<div key={process.id} className={`px-3 max-w-[340px] w-full flex flex-col items-center justify-between shadow-md border-green-800 border-2 bg-green-50 ${
								!openCards[index] ? 'h-auto' : 'h-auto'
							}`}>
								<div className="w-full flex items-center justify-between">
									<div className="text-lg flex-initial">
										{process.title}
									</div>
									<div className="flex gap-2 items-center">
										<Can I={['admin']}>
											<div
												className="cursor-pointer"
												onClick={() => handleOpenDeleteModal(process)}
												>
												<TrashIcon className="w-5" />
											</div>
										</Can>
										<div 
											className="cursor-pointer"
											onClick={() => toggleCard(index)}	
											>
											<PlusCircleIcon className="w-6" />
										</div>
									</div>
								</div>
								{openCards[index] && (
									<div className="text-base py-1 text-left">
										<div>
											{process.description}
										</div>
										<span className="text-xs underline text-blue-700">
											<a href={process.URL} target="_blank" >{process.pdfName}</a>
										</span>
									</div>
								)}
						</div>			
					))
				}
			</div>
		</div>
	)
}

export { Process, loader }
