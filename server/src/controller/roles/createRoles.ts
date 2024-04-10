import { Request, Response } from "express"
import { CreateRolesService } from "src/services/roles/CreateRolesService"

class CreateRolesController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body    
    const rolesService = new CreateRolesService()
    const response = await rolesService.excute({ name, description })

    if (response instanceof Error) {
      res.status(400).json(response.message)
    }

    res.status(200).json(response)
  }
}

export { CreateRolesController }
