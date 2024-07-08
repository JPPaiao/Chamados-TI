import { Response, Request } from "express"
import { CreateProceduresService } from "src/services/process/CreateProceduresService"

interface CreateProceduresProps {
	title: string,
	description: string,
	sector: string,
	userId: string,
	pdfName: string
}

class CreateProceduresController {
	async handle(req: Request, res: Response) {
		const { description, sector, title, pdfName, userId }: CreateProceduresProps = req.body
		const author = userId

		if (!req.file) {
			res.status(401).json('Error: pdf não informado')
			return
		}

		const saveProcedures = await new CreateProceduresService().execute({ title, author, description, sector, pdfName })

		res.status(200).json(saveProcedures)
	}
}

export { CreateProceduresController }