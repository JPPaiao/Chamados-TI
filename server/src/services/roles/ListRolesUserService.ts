import { prismaClient } from "../../prisma/index"

interface ListRolesUserServiceProps {
  userId: string
}

class ListRolesUserService {
  async execute({ userId }: ListRolesUserServiceProps) {
    if (!userId) {
      return "Usuário não existe no sistema" 
    }

    const listRolesUser = await prismaClient.users.findMany({
      where: {
        id: userId
      },
      include: {
        roles: {
          select: {
            roles: true
          }
        }
      }
    })

    if (!listRolesUser) {
      return "Papeis não encontrados"
    }

    return listRolesUser
  }
}

export { ListRolesUserService }