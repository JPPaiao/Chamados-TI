import { Request, Response } from "express"
import { ListProceduresService } from "src/services/process/ListProceduresService"

class ListProceduresController {
	async handle(req: Request, res: Response) {
		const listProceduresService = await new ListProceduresService().execute()

		res.json(listProceduresService)
	}
}

export { ListProceduresController }