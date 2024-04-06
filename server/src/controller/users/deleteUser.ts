import { Response, Request } from "express"
import { DeleteUserService } from "src/services/user/DeleteUserService"

class DeleteUserController {
	async handle(req: Request, res: Response) {
		const { id } = req.body 

    if (!id) {
      throw new Error("Preencha todos os campos")
    }

		const userService = new DeleteUserService()
		const user = await userService.execute(id)
		
		res.json(user)
	}
}

export { DeleteUserController }