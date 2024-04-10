import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { config } from 'dotenv'
config()

const secretKey: string = process.env.SECRET as string

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader: string = req.headers["token"] as string
  
  if (!tokenHeader) {
    res.status(401).json({ menssage: 'Usuário sem autorização para esta ação' })
  }

  try {
    verify(tokenHeader, secretKey)
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).end()
  }
}

export { verifyAuth }