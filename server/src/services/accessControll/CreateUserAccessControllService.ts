import { prismaClient } from "src/prisma"

interface ACLTypes {
  userId: string,
  roles: string[],
  permissions: string[]
}

interface UserTypes {
  id: string,
  email: string,
  username: string,
  password: string,
  permission_id: string[],
  permissions: Object[],
  role_id: string[],
  roles: Object[]
}

interface PermissionsAndRolesTypes {
  id: string; 
  name: string; 
  description: string; 
}

class CreateUserAccessControllService {
  async execute({ userId, roles, permissions }: ACLTypes): Promise<Object | Error> {
    const user = await prismaClient.users.findFirst({ 
      where: { 
        id: userId 
      },
      include: {
        permissions: true,
        roles: true,
      } 
    }) as UserTypes
  
    if (!user) {
      return new Error("Usuário não existe no sistema")
    }

    const existPermissions = permissions.filter(id => user.permission_id.includes(id))
    const existRoles = roles.filter(id => user.role_id.includes(id))

    if (existPermissions.length !== 0 || existRoles.length !== 0) {
      return { response: "Permissões ou Roles ja existentes" }
    }

    const updatePermission = [...user.permission_id, ...permissions]
    const updateRole = [...user.role_id, ...roles]
    
    if (permissions.length !== 0) {
      await prismaClient.users.update({
        where: {
          id: userId
        },
        data: {
          permission_id: updatePermission
        },
        include: {
          permissions: true,
          roles: true
        }
      })
    }

    if (roles.length !== 0) {
      await prismaClient.users.update({
        where: {
          id: userId
        },
        data: {
          role_id: updateRole
        },
        include: {
          permissions: true,
          roles: true
        }
      })
    }
    
    const userUpdated = await prismaClient.users.findFirst({ 
      where: { 
        id: userId 
      },
      include: {
        permissions: true,
        roles: true
      }  
    }) as UserTypes

    return userUpdated
  }
}

export { CreateUserAccessControllService }
