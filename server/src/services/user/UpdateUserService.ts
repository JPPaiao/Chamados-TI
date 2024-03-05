import { prismaClient } from "src/prisma"

interface CreateUserProps {
  field: "username" | "email" | "password",
  data: string
}

interface UpdateUserProps {
  email: string,
  id: string,
  datas: CreateUserProps
}

class UpdateUserService {
  async execute({ email, datas, id }: UpdateUserProps) {
    if (!email) {
      return {
        message: "Error: Informe um email"
      }
    }
    
    const field = datas.field
    if (field === "email" || field === "username" || field === "password") {
      const updateUser = await prismaClient.users.update({
        where: {
          email: email,
          id: id
        },
        data: {
          [field]: datas.data 
        }
      })
    
      return {
        message: 'user update',
        updateUser
      }
    } else return { message: "Error: Campo errado" }
  }
}

export { UpdateUserService }