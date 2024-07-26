import { prismaClient } from "../../prisma/index"

class ListRolesService {
  async execute() {
    return await prismaClient.roles.findMany() 
  }
}

export { ListRolesService }