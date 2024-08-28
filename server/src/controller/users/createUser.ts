import { Response, Request } from "express"
import { CreateUserService } from "src/services/user/CreateUserService"

class CreateUserController {
	async handle(req: Request, res: Response) {
		const { username, email, password, sectorId } = req.body 

    if (!username || !email || !password) {
      res.status(500).json({ "erro": "Preencha todos os campos" })
    }

		const userService = new CreateUserService()
		const user = await userService.execute({ username, email, password, sectorId })
		
		res.json(user)
	}
}

export { CreateUserController }