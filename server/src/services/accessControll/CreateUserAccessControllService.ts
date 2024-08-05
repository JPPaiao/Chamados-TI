import { prismaClient } from "src/prisma"

interface ACLTypes {
  userId: string,
  roles: string[],
  permissions: string[]
}

interface UserPermissions {
  userId: string; 
  permissionId: string 
}

interface UserRoles {
  userId: string; 
  roleId: string 
}

interface UserTypes {
  id: string,
  email: string,
  username: string,
  password: string,
  permissions?: UserPermissions[],
  roles?: UserRoles[]
}

class CreateUserAccessControllService {
  async execute({ userId, roles, permissions }: ACLTypes): Promise<Object | Error> {
    const user = await prismaClient.users.findFirst({ 
      where: { 
        id: userId 
      },
      include: {
        permissions: true,
        roles: true
      }
    }) as UserTypes
  
    if (!user.id) {
      return new Error("Usuário não existe no sistema")
    }

    if (permissions.length > 0) {
      const newPermissionUser = user.permissions?.map((p: UserPermissions) => p.permissionId) as string | undefined
      const newPermissionFilter = permissions.filter((v: string) => !newPermissionUser?.includes(v))
      
      if (newPermissionFilter.length === 0) {
        return "Permissões ja existe para esse usuário"
      }
      
      newPermissionFilter.map(async (permission: string) => {
        await prismaClient.userPermission.create({
          data: {
            userId: user.id,
            permissionId: permission
          }
        }) 
      })
    } 

    if (roles.length > 0) {
      const newRoleUser = user.roles?.map((p: UserRoles) => p.roleId) as string | undefined
      const newRoleFilter = roles.filter((v: string) => !newRoleUser?.includes(v))
      
      if (newRoleFilter.length === 0) {
        return "Roles ja existe para esse usuário"
      }
      
      newRoleFilter.map(async (role: string) => {
        await prismaClient.userRole.create({
          data: {
            userId: user.id,
            roleId: role
          }
        })
      })
    }
    
    if (roles.length === 0 && permissions.length === 0) {
      return "Sem Roles e Permissions"
    }
    
    const userUpdated = await prismaClient.users.findFirst({ 
      where: { 
        id: userId 
      },
      select: {
        username: true,
        email: true,
        permissions: true,
        roles: true,
      }
    }) as UserTypes

    return userUpdated
  }
}

export { CreateUserAccessControllService }
