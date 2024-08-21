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
        id: true,
      }
    })

    if (!user || user.id !== userId) {
      return res.status(400).json("Usuário não existe no sistema")
    }

    const permissionNames = await prismaClient.userpermission.findMany({
      where: {
        userId: user.id,
        permissions: {
          name: {
            in: permissionsRoutes
          }
        }  
      },
      select: {
        permissions: {
          select: {
            name: true
          }
        }
      }
    })

    if (!permissionNames[0]?.permissions?.name) {
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
        id: true
     }
    })

    if (!user || user.id !== userId) {
      return res.status(400).json("Usuário não existe no sistema")
    }

    const rolesNames = await prismaClient.userrole.findMany({
      where: {
        userId: user.id,
        roles: {
          name: {
            in: rolesRoutes
          }
        }  
      },
      select: {
        roles: {
          select: {
            name: true
          }
        }
      }
    })
    
    if (!rolesNames[0]?.roles?.name) {
      res.status(401).json("Usuário sem esse acesso").end()
    } else next()
  }
}

export { can, is }
