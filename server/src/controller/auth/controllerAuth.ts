import { decode, verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { config } from 'dotenv'
config()

const secretKey: string = process.env.SECRET as string

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader: string = req.headers.authorization as string
  
  if (!tokenHeader) {
    res.status(401).json({ menssage: 'Usuário sem autorização para esta ação' })
  }

  try {
    verify(tokenHeader, secretKey)
    const userId = decode(tokenHeader)['userId'] as any 
    req.body.userId = userId

    // console.log(useId)

    next()
  } catch (err) {
    return res.status(401).end()
  }
}

export { verifyAuth }