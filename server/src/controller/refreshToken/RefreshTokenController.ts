import { Request, Response } from "express"
import { ReadRefreshToken } from "./ReadRefreshToken"

class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { refreshToken } = req.body
    const refreshTokenVerify = new ReadRefreshToken()
    const token = await refreshTokenVerify.execute(refreshToken)

    return res.json(token)
  }
}

export { RefreshTokenController }
