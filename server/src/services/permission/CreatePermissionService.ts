import { prismaClient } from "../../prisma/index"

interface PermissionProps {
  name: string,
  description: string
}

class CreatePermissionService {
  async excute({ name, description }: PermissionProps): Promise<Error | Object> {
    if (await prismaClient.permissions.findFirst({ where: { name: name } })) {
      throw new Error("Role ja existe no sistema")
    }

    const createPermission = await prismaClient.permissions.create({
      data: {
        name: name,
        description: description
      }
    })

    return { 
      message: "Permissão criado com sucesso!",
      ...createPermission
    }
  }
}

export { CreatePermissionService }
