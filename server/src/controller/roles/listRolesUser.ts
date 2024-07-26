import { Response, Request } from "express"
import { ListRolesUserService } from "src/services/roles/ListRolesUserService"

class ListRolesUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.body
    const rolesService = new ListRolesUserService()
    const response = await rolesService.execute({ userId })

    if (!response) {
      res.status(400).json({ erro: response })
    }

    res.status(200).json(response)
  }
}

export { ListRolesUserController }