import { prismaClient } from "src/prisma"

interface DeleteProps {
  id: string
}

class DeleteUserService {
  async execute({ id }: DeleteProps) {
    if (!id) {
      throw new Error("Preencha todos os campos")
    }

    const user = await prismaClient.users.delete({
      where: {
        id: id
      }
    })

    return { 
      response: 'Usuário deletado com sucesso',
      ...user      
    }
  }
}

export { DeleteUserService }
