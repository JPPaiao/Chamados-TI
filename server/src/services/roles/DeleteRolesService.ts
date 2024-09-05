import { prismaClient } from "../../prisma/index"

interface RolesProps {
  id: string,
}

class DeleteRolesService {
  async excute({ id }: RolesProps): Promise<Error | Object> {
    const deleteRole = await prismaClient.roles.delete({
      where: {
        id: id
      }
    })

    return deleteRole
  }
}

export { DeleteRolesService }
