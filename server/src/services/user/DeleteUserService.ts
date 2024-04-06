import { prismaClient } from "src/prisma"

class DeleteUserService {
  async execute(idUser: string) {

    if (!idUser) {
      throw new Error("Preencha todos os campos")
    }

    const user = await prismaClient.users.delete({
      where: {
        id: idUser
      }
    })

    return { 
      response: 'Usuário deletado com sucesso',
      ...user      
    }
  }
}

export { DeleteUserService }
