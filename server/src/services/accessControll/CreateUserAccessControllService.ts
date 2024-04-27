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
  permissions: Object[],
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
        roles: true
      } 
    }) as UserTypes
  
    if (!user) {
      return new Error("Usuário não existe no sistema")
    }

    const permissionsExists: PermissionsAndRolesTypes[] | any = await prismaClient.permissions.findMany({
      where: {
        id: { 
          in: permissions 
        }
      }
    }) 

    const rolesExists: PermissionsAndRolesTypes[] | any = await prismaClient.roles.findMany({
      where: {
        id: {
          in: roles
        }
      }
    })

    const mapPermissionIds = permissionsExists.map((p: PermissionsAndRolesTypes) => p.id)
    const mapRolesIds = rolesExists.map((r: PermissionsAndRolesTypes) => r.id)
    
    // if (rolesExists && permissionsExists) {
      await prismaClient.users.create({
        where: {
          id: userId
        },
        data: {
          permissions: mapPermissionIds
          // permissions: mapPermissionIds,
          // roles: mapRolesIds
        },
        include: {
          permissions: true,
          roles: true
        }
      })
    // }

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
