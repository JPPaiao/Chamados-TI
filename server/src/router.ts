import cors from "cors"
import multer from "multer"
import express, { Request, Response } from "express"
import { verifyAuth } from "./controller/auth/controllerAuth"
import { CreateUserController } from "./controller/users/createUser"
import { ListUsersController } from "./controller/users/listUsers"
import { UpdateUserController } from "./controller/users/updateUser"
import { ListProceduresController } from "./controller/procedures/listProcedures"
import { CreateProceduresController } from "./controller/procedures/createProcedures"
import { DeleteProceduresController } from "./controller/procedures/deleteProcedures"
import { LoginController } from "./controller/users/loginUser"
import { DeleteUserController } from "./controller/users/deleteUser"
import { CreateRolesController } from "./controller/roles/createRoles"
import { CreatePermissionController } from "./controller/permission/createPermission"
import { CreateUserAccessControlContorller } from "./controller/accessCrontrol/CreateUserAccesControlController"
import { CreateRolePermissionController } from "./controller/accessCrontrol/CreateRolePermissionController"
import { can, is } from "./middleware/permissions"

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

// app.get('/api/', verifyAuth, getAllCalls)
// app.post('/api/call/set', verifyAuth, setCall)
// app.put('/api/call/updateStatus', verifyAuth, routerUpdate)

// PERMISSION -----------------------
app.post('/api/permissions/create', verifyAuth, (req: Request, res: Response) => {
	return new CreatePermissionController().handle(req, res)
})

app.post('/api/accessControl', verifyAuth, (req: Request, res: Response) => {
	return new CreateUserAccessControlContorller().handle(req, res)
})




// ROLES ----------------------------
app.post('/api/roles/create', verifyAuth, (req: Request, res: Response) => {
	return new CreateRolesController().handle(req, res)
})

app.post('/api/roles/:roleId', verifyAuth, (req: Request, res: Response) => {
	return new CreateRolePermissionController().handle(req, res)
})




// USERS -----------------------------
app.post('/api/auth/login', async (req: Request, res: Response) => {
	return new LoginController().handle(req, res)
})

app.post('/api/user/users', verifyAuth, can(["list_product"]), async (req: Request, res: Response) => {
	return new ListUsersController().handle(req, res)
}) 

app.post('/api/user/create', verifyAuth, is(["admin"]), async (req: Request, res: Response) => {
	return new CreateUserController().handle(req, res)
})

app.put('/api/user/update',  async (req: Request, res: Response) => {
	return new UpdateUserController().handle(req, res)
})

app.delete('/api/user/delete',  async (req: Request, res: Response) => {
	return new DeleteUserController().handle(req, res)
})




// PROCEDURES ---------------------------
app.get('/api/procedures', verifyAuth, async (req: Request, res: Response) => {
	return new ListProceduresController().handle(req, res)
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/procedures/create', verifyAuth, upload.single('pdf'), async (req: Request, res: Response) => {
	return new CreateProceduresController().handle(req, res)
})

app.delete('/api/procedures/delete/:procedureId', verifyAuth, async (req: Request, res: Response) => {
	return new DeleteProceduresController().handle(req, res)
})

export { app }
