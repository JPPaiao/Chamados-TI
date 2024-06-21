import { prismaClient } from "src/prisma"

class ListProceduresService {
	async execute() {
		const listPdfs = await prismaClient.procedures.findMany()

		return listPdfs
	}
}

export { ListProceduresService }