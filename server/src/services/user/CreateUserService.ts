import { prismaClient } from "src/prisma"

interface CreateUserProps {
  id?: string,
  username: string,
  email: string,
  password: string,

}

class CreateUserService {
  async execute({ username, email, password }: CreateUserProps) {

    if (!username || !email || !password) {
      throw new Error("Preencha todos os campos")
    }

    await prismaClient.users.create({
      data: {
        username,
        email,
        password
      }
    })

    return `Usuário ${username} criado com sucesso`
  }
}

export { CreateUserService }
