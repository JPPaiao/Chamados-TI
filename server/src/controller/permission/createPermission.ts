import { Request, Response } from "express"
import { CreatePermissionService } from "src/services/permission/CreatePermissionService"

class CreatePermissionController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body    
    const permissionService = new CreatePermissionService()
    const response = await permissionService.excute({ name, description })

    if (response instanceof Error) {
      res.status(400).json(response.message)
    }

    res.status(200).json(response)
  }
}

export { CreatePermissionController }
