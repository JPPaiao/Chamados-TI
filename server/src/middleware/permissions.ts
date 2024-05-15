import { Response, Request, NextFunction } from "express"
import { prismaClient } from "src/prisma"

interface PermissionsType {
  id: string;
  name: string;
  description: string;
  user_id: string[];
  role_id: string[];
}

interface RoleType {
  id: string;
  name: string;
  description: string;
  user_id: string[];
  permission_id: string[];
}

function can(permissionsRoutes: string[]) {
  return async function userPermission(req: Request, res: Response, next: NextFunction) {
    const { userId }: any = req.body

    const user = await prismaClient.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        permissions: true,
        roles: true
     }
    })

    if (!user || user.id !== userId) {
      return res.status(400).json("Usuário não existe no sistema")
    }

    const verify = user?.permissions
    .map((permission: PermissionsType) => permission.name)
    .some((permisisonName: string) => permissionsRoutes.includes(permisisonName))
    // const verify = namePermissionsUser?.some((permisisonName: string) => permissionsRoutes.includes(permisisonName))

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
      include: {
        roles: true,
        permissions: true
     }
    })

    if (!user || user.id !== userId) {
      return res.status(400).json("Usuário não existe no sistema")
    }

    const verify = user?.roles
    .map((role: RoleType) => role.name) 
    .some((roleName: string) => rolesRoutes.includes(roleName))

    if (!verify) {
      res.status(401).json("Usuário sem permissão").end()
    } else next()
  }
}

export { can, is }
