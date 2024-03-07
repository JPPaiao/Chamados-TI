import cors from "cors"
import multer from "multer"
import express, { Request, Response } from "express"
import { getAllCalls, setCall, routerUpdate } from "./controller/controllerCall"
import { verifyAuth } from "./controller/auth/controllerAuth"
import { CreateUserController } from "./controller/users/createUser"
import { ListUsersController } from "./controller/users/listUsers"
import { UpdateUserController } from "./controller/users/updateUser"
import { ListProceduresController } from "./controller/procedures/listProcedures"
import { CreateProceduresController } from "./controller/procedures/createProcedures"
import { DeleteProceduresController } from "./controller/procedures/deleteProcedures"
import { LoginController } from "./controller/users/loginUser"

const app = express()

app.use((req: Request, res: Response, next) => {
	cors()
	next()
})
app.use((req: Request, res: Response, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

app.use(express.json())

app.get('/api/', verifyAuth, getAllCalls)
app.post('/api/call/set', verifyAuth, setCall)
app.put('/api/call/updateStatus', verifyAuth, routerUpdate)


// USER -----------------------------
app.post('/api/auth/login', async (req: Request, res: Response) => {
	return new LoginController().handle(req, res)
})

app.post('/api/user/users', verifyAuth, async (req: Request, res: Response) => {
	return new ListUsersController().handle(req, res)
})

app.post('/api/user/create', async (req: Request, res: Response) => {
	return new CreateUserController().handle(req, res)
})

app.put('/api/user/update',  async (req: Request, res: Response) => {
	return new UpdateUserController().handle(req, res)
})

// PROCEDURES ---------------------------
app.get('/api/procedures', async (req: Request, res: Response) => {
	return new ListProceduresController().handle(req, res)
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/procedures/create', upload.single('pdf'), async (req: Request, res: Response) => {
	return new CreateProceduresController().handle(req, res)
})

app.delete('/api/procedures/delete/:procedureId', async (req: Request, res: Response) => {
	return new DeleteProceduresController().handle(req, res)
})

export { app }
