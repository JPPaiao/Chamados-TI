import { prismaClient } from "src/prisma"

interface CreateUserProps {
  username: string,
  email: string,
  password: string,
}

class CreateUserService {
  async execute({ username, email, password }: CreateUserProps) {

    if (!username || !email || !password) {
      throw new Error("Preencha todos os campos")
    }

    const user = await prismaClient.users.create({
      data: {
        username,
        email,
        password
      }
    })

    return user
  }
}

export { CreateUserService }
