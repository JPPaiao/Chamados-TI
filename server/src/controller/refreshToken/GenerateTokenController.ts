import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET as string

class GenerateTokenController {
  async execute(userId: string) {
    const token =  jwt.sign({ userId: userId }, secretKey, { 
      subject: userId,
      expiresIn: '20s'
    })

    return token
  }
}

export { GenerateTokenController }
