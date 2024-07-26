import { decode, verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { config } from 'dotenv'
config()

const secretKey: string = process.env.SECRET as string

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader: string = req.headers.authorization as string
  
  try {
    if (!tokenHeader) {
      res.status(401).json({ menssage: 'Usuário sem autorização para esta ação' })
    }

    verify(tokenHeader, secretKey)
    const payload = decode(tokenHeader)?.userId as null | string

    if (!payload) {
      return res.status(401).json({ menssage: 'Sem autorização para acessar essa rota' })
    }

    req.body.userId = payload

    next()
  } catch (err) {
    return res.status(401).end()
  }
}

export { verifyAuth }