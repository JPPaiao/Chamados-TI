import { prismaClient } from "src/prisma"

interface CreateUserProps {
  username: string,
  email: string,
  password: string,
  sectorId?: number | null,
  refreshTokenId?: string | null
}

class CreateUserService {
  async execute({ username, email, password, sectorId, refreshTokenId }: CreateUserProps) {

    if (!username || !email || !password) {
      throw new Error("Preencha todos os campos")
    }

    await prismaClient.users.create({
      data: {
        username,
        email,
        password,
        sectorId,
        refreshTokenId,
      }
    })

    return `Usuário ${username} criado com sucesso`
  }
}

export { CreateUserService }
