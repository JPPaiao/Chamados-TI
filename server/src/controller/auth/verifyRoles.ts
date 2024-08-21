import { Request, Response } from "express"
import { prismaClient } from "src/prisma"

async function verifyRoles(req: Request, res: Response) {
  const userId = req.body.userId

  if (!userId) {
    res.status(401).json("Sem acesso")
  }

  const rolesUser = await prismaClient.userrole.findMany({
    where: {
      userId: userId
    },
    select: {
      roles: true
    }
  })
  const fillRoles = rolesUser.map(r => r.roles)

  if (!fillRoles || fillRoles.length <= 0) {
    res.status(401).json("Usuário sem papeis")
  }

  res.status(200).json(fillRoles)
}

export { verifyRoles }