import { prismaClient } from "src/prisma"

class ListUsersService {
  async execute() {
    const listUsers = await prismaClient.users.findMany({
      include: {
        permissions: true,
        roles: true
      }
    })

    return listUsers
  }
}

export { ListUsersService }
