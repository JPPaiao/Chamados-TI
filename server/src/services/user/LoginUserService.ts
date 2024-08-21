import { prismaClient } from "src/prisma"

interface LoginUserProps {
	username: string,
	password: string,
}

interface RoleAndPermissions {
	permissions: {
		permissionId: string,
		userId: string
	},
	roles: {
		roleId: string,
		userId: string
	}
}

interface LoginUser extends LoginUserProps, RoleAndPermissions {
	email: string,
	id: string
}

class LoginUserService {
	async execute({ username, password }: LoginUserProps) {
		if (!username || !password) {
			return { status: false }
		}
		
		try {
			const user = await prismaClient.users.findFirst({
				where: {
					username: username
				},
				include: {
					roles: {
						select: {
							roles: true
						}
					},
					permissions: {
						select: {
							permissions: true
						}
					}
				}
			}) as LoginUser | null

			if (user && user?.password === password) {
				return { user: user, status: true }
			}
		} catch (err) {
			return { status: false }
		}
	}	
}

export { LoginUserService }