import { prismaClient } from "src/prisma"
import { connectDriver } from "src/controller/driver"

interface ConnectDrive {
	driverService?: any,
	fileMetaData?: Object,
}

class DeleteProceduresService {
	async execute(id: number) {
		try {
			if (!id) return { message: "Error: Passe um ID valido" }

			const { driverService } = await connectDriver({}) as ConnectDrive
	
			const proceduresDelete = await prismaClient.procedures.findUnique({
				where: { id: id },
				select: {
					pdfId: true
				}
			})

			if (!proceduresDelete) return { message: "Error: Procedimento não encontrado" }

			await driverService.files.delete({
				fileId: proceduresDelete.pdfId
			})
			await prismaClient.procedures.delete({ where: { id: id } })
	
			return { message: "Procedimento excluidos com sucesso!" }
		} catch (error) {
			console.error('Erro ao deletar procedimento e PDF associado:', error)
			return { error: 'Erro ao deletar procedimento e PDF associado.' }
		}
	}
}

export { DeleteProceduresService }