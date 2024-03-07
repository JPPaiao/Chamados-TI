import { Response, Request, NextFunction } from "express"
import multer from "multer"
import { CreateProceduresService } from "src/services/process/CreateProceduresService"

interface CreateProceduresProps {
	title: string,
	description: string,
	author: string,
	sector: string
	pdfName: string
}

class CreateProceduresController {
	async handle(req: Request, res: Response) {
		const { author, description, sector, title, pdfName }: CreateProceduresProps = req.body 
		const content = req.file?.buffer as Buffer

		const saveProcedures = await new CreateProceduresService().execute({ title, author, content, description, sector, pdfName })

		res.json(saveProcedures)
	}
}

export { CreateProceduresController }