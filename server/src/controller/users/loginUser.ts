import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { LoginUserService } from "src/services/user/LoginUserService"

interface LoginProps {
	username: string,
	password: string
}

class LoginController {
	async handle(req: Request, res: Response) {
		const { username, password }: LoginProps = req.body
		const secretKey = process.env.SECRET as string
		const loginUserService = await new LoginUserService().execute({ username, password })
		
		if (!loginUserService?.status) {
			res.json({ error: "Credenciais inválidas" })
			return;
		}
		
		const token = jwt.sign({ userId: loginUserService.user?.id }, secretKey)

		res.status(200).json({ ...loginUserService, token })
		return;
	}
}

export { LoginController }