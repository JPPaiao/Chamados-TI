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
		const service = new LoginUserService()
		const loginUserService = await service.execute({ username, password })
		
		if (!loginUserService?.status) {
			return res.json({ error: "Credenciais inválidas" })
		}
		
		const token = jwt.sign({ userId: loginUserService.user?.id }, secretKey, { expiresIn: '6h' })

		return res.status(200).json({ ...loginUserService, token })
	}
}

export { LoginController }