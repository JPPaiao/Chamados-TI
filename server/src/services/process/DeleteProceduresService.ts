import { prismaClient } from "src/prisma"

class DeleteProceduresService {
	async execute(id: number) {
		try {
			if (!id) return { message: "Error: Passe um ID valido" }
	
			const proceduresDelete = await prismaClient.procedures.findUnique({
				where: { id: id }
			})

			if (!proceduresDelete) return { message: "Error: Procedimento não encontrado" }
	
			await prismaClient.procedures.delete({ where: { id: id } })
	
			return { message: "Procedimento excluidos com sucesso!" }
		} catch (error) {
			console.error('Erro ao deletar procedimento e PDF associado:', error)
			return { error: 'Erro ao deletar procedimento e PDF associado.' }
		}
	}
}

export { DeleteProceduresService }