import { Request, Response } from "express"
import { LoginUserService } from "src/services/user/LoginUserService"
import { GenerateRefreshToken } from "../refreshToken/CreateRefreshToken"
import { GenerateTokenController } from "../refreshToken/GenerateTokenController"
import { DeleteRefreshToken } from "../refreshToken/DeleteRefreshToken"

interface LoginProps {
	username: string,
	password: string
}

class LoginController {
	async handle(req: Request, res: Response) {
		const { username, password }: LoginProps = req.body
		const service = new LoginUserService()
		const loginUserService = await service.execute({ username, password })
		
		if (!loginUserService?.status || !loginUserService?.user) {
			return res.json({ error: "Credenciais inválidas" })
		}
		
		const generateTokenController = new GenerateTokenController()
		const token = await generateTokenController.execute(loginUserService.user.id)
		
		const deleteRefreshToken = new DeleteRefreshToken()
		const deleteRefresh = await deleteRefreshToken.execut(loginUserService.user.id)

		const generateRefreshToken = new GenerateRefreshToken()
		const refreshToken = await generateRefreshToken.execute(loginUserService.user.id)

		return res.status(200).json({ ...loginUserService, token, refreshToken })
	}
}

export { LoginController }