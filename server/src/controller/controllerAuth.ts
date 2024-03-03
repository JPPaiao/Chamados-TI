import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"

const secretKey = 'skljaksdj9983498327453lsldkj@@#'

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader: string = req.headers["auth"] as string
  
  if (!tokenHeader) {
    res.status(401).json({ menssage: 'Usuário sem autorização para esta ação' })
  } 
  
  verify(tokenHeader, secretKey, (err: any, user: any) => {
    if (err) res.status(403).json({ menssage: 'Falha na autenticação do token' }) 
    next()
  })  
}

export { verifyAuth }
