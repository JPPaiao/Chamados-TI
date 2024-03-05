import { Response, Request } from "express"
import { CreateUserService } from "src/services/user/CreateUserService"

class CreateUserController {
	async handle(req: Request, res: Response) {
		const { username, email, password } = req.body 

		const userService = new CreateUserService()
		const user = await userService.execute({ username, email, password })
		
		res.json(user)
	}
}

export { CreateUserController }