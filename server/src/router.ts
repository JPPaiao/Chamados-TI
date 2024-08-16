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
import { ListRolesController } from "./controller/roles/listRoles"
import { ListRolesUserController } from "./controller/roles/listRolesUser"
import { verifyRoles } from "./controller/auth/verifyRoles"

const app = express()
app.use(express.json())
app.use(cors())

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

app.get('/api/roles', verifyAuth, is(["admin"]), async (req: Request, res: Response) => {
	return new ListRolesController().handle(req, res)
})

app.get('/api/roles/user', verifyAuth, async (req: Request, res: Response) => {
	return verifyRoles(req, res)
})


// USERS -----------------------------
app.post('/api/auth/login', async (req: Request, res: Response) => {
	return new LoginController().handle(req, res)
})

app.get('/api/users', verifyAuth, is(['admin']), async (req: Request, res: Response) => {
	return new ListUsersController().handle(req, res)
}) 

app.post('/api/user/create', verifyAuth, is(['admin']), async (req: Request, res: Response) => {
	return new CreateUserController().handle(req, res)
})

app.put('/api/user/update', verifyAuth, is(['admin']), async (req: Request, res: Response) => {
	return new UpdateUserController().handle(req, res)
})

app.delete('/api/user/delete', verifyAuth, is(['admin']), async (req: Request, res: Response) => {
	return new DeleteUserController().handle(req, res)
})

app.get('/api/user/roles', verifyAuth, async (req: Request, res: Response) => {
	return new ListRolesUserController().handle(req, res)
})



// PROCEDURES ---------------------------
app.get('/api/procedures', verifyAuth, async (req: Request, res: Response) => {
	return new ListProceduresController().handle(req, res)
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/procedures/create',  upload.single('pdf'), verifyAuth, async (req: Request, res: Response) => {
	return new CreateProceduresController().handle(req, res)
})

app.delete('/api/procedures/delete/:procedureId', verifyAuth, is(["admin"]), async (req: Request, res: Response) => {
	return new DeleteProceduresController().handle(req, res)
})

export { app }
