import { Request, Response } from "express"
import { ListRolesService } from "src/services/roles/ListRolesService"

class ListRolesController {
  async handle(req: Request, res: Response) {
    const rolesService = new ListRolesService()
    const response = await rolesService.execute()

    if (!response) {
      res.status(400).json({ erro: "Papeis não encontrados" })
    }

    res.status(200).json(response)
  }
}

export { ListRolesController }