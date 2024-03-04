import { Response, Request } from "express"
import { CreateCustomerService } from "src/services/CreateCustomerService"

class CreateCustomerController {
	async handle(req: Request, res: Response) {
		const customerService = new CreateCustomerService()
		const customer = await customerService.execute()
		
		res.json(customer)
	}
}

export { CreateCustomerController }