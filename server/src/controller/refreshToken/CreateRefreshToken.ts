import { prismaClient } from "src/prisma"
import dayjs from "dayjs"

class GenerateRefreshToken {
  async execute(userId: string) {
    const expresIn = dayjs().add(30, "second").unix()

    const generateRefreshToken = await prismaClient.refreshtokens.create({
      data: {
        userId,
        expresIn
      }
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshToken }