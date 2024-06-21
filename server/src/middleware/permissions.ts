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

    const permissionNames = await prismaClient.userPermission.findMany({
      where: {
        userId: user.id,
        permission: {
          name: {
            in: permissionsRoutes
          }
        }  
      },
      select: {
        permission: {
          select: {
            name: true
          }
        }
      }
    })

    if (!permissionNames[0]?.permission?.name) {
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

    const rolesNames = await prismaClient.userRole.findMany({
      where: {
        userId: user.id,
        role: {
          name: {
            in: rolesRoutes
          }
        }  
      },
      select: {
        role: {
          select: {
            name: true
          }
        }
      }
    })
    
    if (!rolesNames[0]?.role?.name) {
      res.status(401).json("Usuário sem esse acesso").end()
    } else next()
  }
}

export { can, is }
