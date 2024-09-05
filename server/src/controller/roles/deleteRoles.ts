import { Request, Response } from "express"
import { DeleteRolesService } from "src/services/roles/DeleteRolesService"

class DeleteRolesController {
  async handle(req: Request, res: Response) {
    const { id } = req.body 

    if (!id) {
      res.status(400).json('Informe um ID valido')
    }
    
    const rolesService = new DeleteRolesService()
    const response = await rolesService.excute({ id })

    if (response instanceof Error) {
      res.status(400).json(response.message)
    }

    res.status(200).json(response)
  }
}

export { DeleteRolesController }
