import { Response, Request } from "express"
import { UpdateUserService } from "src/services/user/UpdateUserService"

interface CreateUserProps {
  field: 'username' | 'email' | 'password',
  data: string
}

interface UpdateUserProps {
  email: string,
  id: string,
  datas: CreateUserProps
}

class UpdateUserController {
	async handle(req: Request, res: Response) {
		const { email, datas, id } = req.body as UpdateUserProps	
		const updateUserService = new UpdateUserService()
		const updateUser = await updateUserService.execute({ email, datas, id })

		res.json(updateUser)
	}
}

export { UpdateUserController }