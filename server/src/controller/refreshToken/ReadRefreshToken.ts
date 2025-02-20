import { prismaClient } from "src/prisma";
import { GenerateTokenController } from "./GenerateTokenController";
import dayjs from "dayjs";
import { GenerateRefreshToken } from "./CreateRefreshToken";

class ReadRefreshToken {
  async execute(refreshTokenId: string) {
    const refreshToken = await prismaClient.refreshtokens.findFirst({
      where: {
        id: refreshTokenId
      }
    })

    if (!refreshToken) {
      return { message: "Refresh token invalid!" }
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expresIn))
    
    const generateToken = new GenerateTokenController()
    const token = await generateToken.execute(refreshToken.userId)

    if (refreshTokenExpired) {
      await prismaClient.refreshtokens.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })

      const generateRefreshToken = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId)

      return { token: token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { ReadRefreshToken }