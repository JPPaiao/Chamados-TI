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
		const loginUserService = await new LoginUserService().execute({ password, username })
		
		if (!loginUserService.status) {
			res.json(loginUserService.error)
		}

		const token = jwt.sign({ userId: loginUserService.user?.id }, secretKey)
		const loginUser = {
			id: loginUserService.user?.id,
			email: loginUserService.user?.email,
			username: loginUserService.user?.username,
			paper: loginUserService.user?.paper
		}

		res.json({ user: loginUser, token })
	}
}

export { LoginController }