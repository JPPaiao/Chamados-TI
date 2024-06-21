import { prismaClient } from "src/prisma"
import { google } from "googleapis"
import fs from 'fs'
import key from '../../../keyDriver.json'

interface CreateProceduresProps {
	title: string,
	description: string,
	author: string,
	sector: string,
	pdfName: string,
	pdfPath: string
}

class CreateProceduresService {
	async execute({ title, description, author, sector, pdfPath, pdfName }: CreateProceduresProps) {
		if (!title || !description || !sector ) {
			return { message: "Error: Preencha todos os campos" }
		}

		async function uploadFile() {
			try {
				const auth = new google.auth.JWT(
					key.client_email,
					undefined,
					key.private_key,
					['https://www.googleapis.com/auth/drive'],
					undefined
				)

				await auth.authorize()

				const driverService = google.drive({
					version: 'v3',
					auth
				})

				const fileMetaData = {
					name: `${pdfName}.pdf`,
					parents: ["15xagA2YJAxm5I-zC7WhipR38iKsfb9vJ"]
				}

				const media = {
					mineType: 'application/pdf',
					body: fs.createReadStream(pdfPath)
				}

				const file = await driverService.files.create({
					requestBody: fileMetaData,
					media: media,
					fields: 'id',
				})

				if (typeof file.data.id === 'string') {
					const getFile = await driverService.files.get({
						fileId: file.data.id,
						fields: 'webViewLink',
					})

					return { 
						fileId: file.data.id,
						fileUrl: getFile.data.webViewLink,
						status: true
					}
				}
				return { status: false }

			} catch (error) {
				console.log(error)
			}
			return { status: false }
		}

		const file = await uploadFile()
		
		if (file?.status) {
			try {
				if (file.fileId && file.fileUrl) {

					const proceduresCreate = await prismaClient.procedures.create({
						data: {
							author,
							description,
							sector,
							title,
							pdfId: file.fileId,
							pdfName: pdfName,
							URL: file.fileUrl
						}
					})

					return { message: "Processo criado com sucesso!", id: proceduresCreate.id }
				}
			} catch (error) {
				console.log(error)
			}
		}
		return { message: "Error ao criar o processo", status: false }
	} 
}

export { CreateProceduresService }