import { prismaClient } from "src/prisma";

interface RolesPermissionsProps {
  roleId: string,
  permissions: string[]
}

class CreateRolePermissionService {
  async execute({ roleId, permissions }: RolesPermissionsProps) {
    const role = await prismaClient.roles.findFirst({
      where: {
        id: roleId
      }
    })

    if (!role || role.id !== roleId) {
      return new Error('Role não existe no sistema')
    }

    const permissionsExists = await prismaClient.permissions.findMany({
      where: {
        id: {
          in: permissions
        }
      },
      select: {
        id: true
      }
    })

    const mapPermissionExists = permissionsExists.map(id => id.id)

    if (mapPermissionExists.length > 0) {
      await prismaClient.roles.update({
        where: {
          id: roleId
        },
        data: {
          permissions: mapPermissionExists
        }
      })
    }
 
    const roleUpdated = await prismaClient.roles.findFirst({
      where: {
        id: roleId
      },
      include: {
        permissions: true,
        roles: true
      }
    })

    return roleUpdated
  }
} 

export { CreateRolePermissionService }
