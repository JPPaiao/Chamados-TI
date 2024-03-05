import { Response, Request } from "express"
import { ListUsersService } from "src/services/user/ListUsersService"

class ListUsersController {
  async handle(req: Request, res: Response) {
    const listUsersService = new ListUsersService()
    const listUsers = await listUsersService.execute()
    
    res.status(200).json(listUsers)
  }
}

export { ListUsersController }