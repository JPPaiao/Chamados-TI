import { prismaClient } from "src/prisma"

class ListUsersService {
  async execute() {
    const customers = await prismaClient.users.findMany()

    return customers
  }
}

export { ListUsersService }
