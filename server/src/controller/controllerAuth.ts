import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"

const secretKey = 'skljaksdj9983498327453lsldkj@@#'

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers["auth"] as string
  const token = tokenHeader.split(" ")[1]

  if (!tokenHeader) {
    res.status(401).json({ menssage: 'Erro: Usuário sem autorização para esta ação' })
  } 
  console.log(tokenHeader)
  
  try {
    console.log(token)
    
    verify(token, secretKey)
    next()
  } catch (err) {
    res.status(500).json({ menssage: 'Erro: Token não valido' })
  }
}

export { verifyAuth }
