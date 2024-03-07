import { prismaClient } from "src/prisma"

class DeleteProceduresService {
	async execute(id: string) {
		try {
			if (!id) return { message: "Error: Passe um ID valido" }
	
			const proceduresDelete = await prismaClient.procedures.findUnique({
				where: { id: id },
				include: { pdf: true }
			})
	
			if (!proceduresDelete) return { message: "Error: Procedimento não encontrado" }
	
			if (proceduresDelete.pdf) {
				await prismaClient.pdf.delete({ where: { id: proceduresDelete.pdf.id } })
			}
	
			await prismaClient.procedures.delete({ where: { id: id } })
	
			return { message: "Procedimento e PDF excluidos com sucesso!" }
		} catch (error) {
			console.error('Erro ao deletar procedimento e PDF associado:', error)
			return { error: 'Erro ao deletar procedimento e PDF associado.' }
		}
	}
}

export { DeleteProceduresService }