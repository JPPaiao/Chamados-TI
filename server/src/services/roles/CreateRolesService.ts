import { prismaClient } from "../../prisma/index"

interface RolesProps {
  name: string,
  description: string
}

class CreateRolesService {
  async excute({ name, description }: RolesProps): Promise<Error | Object> {
    if (await prismaClient.roles.findFirst({ where: { name: name } })) {
      return "Essa role ja existe no sistema"
    }

    const createRole = await prismaClient.roles.create({
      data: {
        name: name,
        description: description,
      }
    })

    return createRole
  }
}

export { CreateRolesService }
