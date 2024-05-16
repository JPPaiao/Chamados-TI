import { prismaClient } from "src/prisma"

interface LoginUserProps {
	username: string,
	password: string,
}

interface LoginUser extends LoginUserProps {
	email: string,
	id: string,	
}

class LoginUserService {
	async execute({ username, password }: LoginUserProps) {
		if (!username || !password) {
			return { status: false }
		}
		
		try {
			const user: LoginUser | null = await prismaClient.users.findFirst({
				where: {
					username: username
				}
			})
			if (user && user?.password === password) {
				return { user: user, status: true }
			}
		} catch (err) {
			return { status: false }
		}
	}	
}

export { LoginUserService }