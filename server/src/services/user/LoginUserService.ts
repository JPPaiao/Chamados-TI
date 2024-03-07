import { prismaClient } from "src/prisma"

interface LoginUserProps {
	username: string,
	password: string
}

class LoginUserService {
	async execute({ username, password }: LoginUserProps) {
		if (!username || !password) {
			return { error: "Usuário ou senha invalidos", status: false }
		}

		const user = await prismaClient.users.findFirst({
			where: {
				username: username
			}
		})

		if (!user || user.password !== password) {
			return { error: "Credenciais inválidas", status: false }
		}

		return { user: user, status: true }
	}	
}

export { LoginUserService }