import { Request, Response } from "express"
import { CreateUserAccessControllService } from "src/services/accessControll/CreateUserAccessControllService"

interface BodyProps {
  permissions: string[],
  roles: string[],
  userId: string,
}

class CreateUserAccessControlContorller {
  async handle(req: Request, res: Response) {
    const { permissions, roles, userId }: BodyProps = req.body
    const createAccessControlService = new CreateUserAccessControllService()
    const result = await createAccessControlService.execute({ permissions, roles, userId })

    if (result instanceof Error) {
      res.status(401).json(result.message)
    }

    res.json(result)
  }
}

export { CreateUserAccessControlContorller }