import { prismaClient } from "src/prisma"

interface CreateProceduresProps {
	title: string,
	description: string,
	author: string,
	sector: string,
	pdfName: string,
	content: Buffer
}

class CreateProceduresService {
	async execute({ title, description, author, sector, content, pdfName }: CreateProceduresProps) {
		if (!title || !description || !sector ) {
			return { message: "Error: Preencha todos os campos" }
		}

		const proceduresCreate = await prismaClient.pdf.create({
			data: {
				name: pdfName,
				content,
				procedure: {
				  create: {
						title,
						description,
						author,
						sector,
					},
				},
			},
		})

		return { message: "Processo criado com sucesso!", id: proceduresCreate.id }
	} 
}

export { CreateProceduresService }