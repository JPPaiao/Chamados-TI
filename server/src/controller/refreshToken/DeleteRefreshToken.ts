import { prismaClient } from "src/prisma"

class DeleteRefreshToken {
  async execut(id: string) {
    await prismaClient.refreshtokens.deleteMany({
      where: {
        userId: id
      }
    })
  }
}

export { DeleteRefreshToken }
