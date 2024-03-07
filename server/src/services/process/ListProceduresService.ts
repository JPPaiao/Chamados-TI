import { prismaClient } from "src/prisma";

class ListProceduresService {
	async execute() {
		const listPdfs = await prismaClient.pdf.findMany({select: { procedure: true, content: true, name: true } })

		return listPdfs
	}
}

export { ListProceduresService }