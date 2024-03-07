import { Response, Request } from "express"
import { DeleteProceduresService } from "src/services/process/DeleteProceduresService"

class DeleteProceduresController {
  async handle(req: Request, res: Response) {
		const proceduresId = req.params.procedureId

		if (!proceduresId) res.json({ message: "Error: Passe um ID valido" })

		const deleteProcedures = await new DeleteProceduresService().execute(proceduresId)

		res.json(deleteProcedures)
	}
} 

export { DeleteProceduresController }