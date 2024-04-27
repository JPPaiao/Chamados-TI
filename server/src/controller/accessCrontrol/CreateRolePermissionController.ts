import { Request, Response } from "express";
import { CreateRolePermissionService } from "src/services/accessControll/CreateRolePermissionService";

class CreateRolePermissionController {
  async handle(req: Request, res: Response) {
    const { permissions } = req.body
    const { roleId } = req.params

    const createRolePermissionService = new CreateRolePermissionService()
    const response = await createRolePermissionService.execute({ roleId, permissions })

    if (response instanceof Error) {
      res.status(400).json(response.message)
    }

    res.json(response)
  }
}

export { CreateRolePermissionController }
