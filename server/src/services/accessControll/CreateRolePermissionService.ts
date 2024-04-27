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

    await prismaClient.permissions_roles.deleteMany({
      where: {
        role_id: roleId 
      }
    })
    const permissionsExists = await prismaClient.permissions.findMany({
      select: {
        id: true
      },
      where: {
        id: {
          in: permissions
        }
      }
    })

    const mapPermissions = permissionsExists.map(permi => permi.id)
    await prismaClient.permissions_roles.create({
      data: {
        role_id: roleId,
        permission_id: mapPermissions
      }
    })

    const roleUpdated = await prismaClient.roles.findFirst({
      where: {
        id: roleId
      },
      include: {
        permissions: true,
        users: true
      }
    })

    return roleUpdated
  }
} 

export { CreateRolePermissionService }
