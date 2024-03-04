import { prismaClient } from "src/prisma"

class CreateCustomerService {
    async execute() {
        console.log('Execute chamado')

        return { ok: true }
    }
}

export { CreateCustomerService }
