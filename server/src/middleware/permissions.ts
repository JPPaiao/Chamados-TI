import { Response, Request, NextFunction } from "express"
import { prismaClient } from "src/prisma"

function can(permissionsRoutes: string[]) {
  return async function userPermission(req: Request, res: Response, next: NextFunction) {
    const { userId }: any = req.body

    const user = await prismaClient.users.findFirst({
      where: {
        id: userId,
        
      },
      select: {
        permissions: true,
        id: true
     }
    })

    if (!user || user.id !== userId) {
      return res.status(400).json("Usuário não existe no sistema")
    }

    const permissions = await prismaClient.permissions.findMany({
      where: {
        name: {
          in: permissionsRoutes
        }
      }
    })

    const permissionsUser = user?.permissions.map((permission: any) => permission.permission_id[0]) as string[]
    const verify = permissions?.some((permisison: any) => permissionsUser.includes(permisison.id))

    if (!verify) {
      res.status(401).json("Usuário sem permissão").end()
    } else next()
  }
}

function is(rolesRoutes: string[]) {
  return async function userRoles(req: Request, res: Response, next: NextFunction) {
    const { userId }: any = req.body

    const user = await prismaClient.users.findFirst({
      where: {
        id: userId,
        
      },
      select: {
        roles: true,
        id: true
     }
    })

    if (!user || user.id !== userId) {
      return res.status(400).json("Usuário não existe no sistema")
    }

    const roles = await prismaClient.roles.findMany({
      where: {
        name: {
          in: rolesRoutes
        }
      }
    })

    const rolesUser = user?.roles.map((role: any) => role.role_id[0]) 
    const verify = roles?.some((role: any) => rolesUser.includes(role.id))

    if (!verify) {
      res.status(401).json("Usuário sem permissão").end()
    } else next()
  }
}

export { can, is }
