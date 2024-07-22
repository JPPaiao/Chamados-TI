interface ModalProps {
	mensagen: string,
	isOpen: boolean,
	actionType: boolean,
	onConfirm?: () => Promise<void>,
	onCancel?: () => void,
}

function Modal({ mensagen, isOpen, actionType, onConfirm, onCancel }: ModalProps) {
	if (!isOpen) {
    return null
  }

	return (
		<dialog
				open={isOpen}
				className="px-3 py-2 border-2 border-green-800 transition-all shadow-md backdrop:bg-black/5 text-center bottom-[84%] left-[64%] m-3 outline-none text-lg" 
			>
				<div className="flex flex-col gap-3">
					<h1>
						{ 
							mensagen
						}
					</h1>
					{
						actionType && onConfirm !== undefined && onCancel !== undefined && (
							<div className="flex justify-around gap-2 text-sm">
								<button 
									className="px-3 cursor-pointer hover:bg-green-800 hover:text-white transition-all shadow-md border-green-800 border-2 bg-green-50 outline-none"
									onClick={async () => await onConfirm()} 
								>
									Confirmar
								</button>
								<button 
									onClick={() => onCancel()}
									className="px-3 cursor-pointer hover:bg-green-800 hover:text-white transition-all shadow-md border-green-800 border-2 bg-green-50 outline-none"
								>
									Cancelar
								</button>
							</div>
						)
					}
				</div>
		</dialog>
	)
}

export { Modal }