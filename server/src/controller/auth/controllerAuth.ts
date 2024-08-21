import { decode, verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { config } from 'dotenv'
import { prismaClient } from 'src/prisma'
config()

interface TokenPayload {
  userId: string
}

const secretKey = process.env.SECRET as string

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader: string = req.headers.authorization as string
  
  try {
    if (!tokenHeader) {
      res.status(401).json({ menssage: 'Usuário sem autorização para esta ação' })
    }
    
    const { userId } = verify(tokenHeader, secretKey) as TokenPayload
    const user = await prismaClient.users.findFirst({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Error('Erro interno')
    }
    
    req.body.userId = user.id
    
    next()
  } catch (err) {
    return res.status(401).json({ erro: "Usuário sem token ou expirado" })
  }
}

export { verifyAuth }