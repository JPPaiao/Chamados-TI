import cors from "cors"
import express from "express"
import { Request, Response } from "express"
import { getAllCalls, setCall, routerUpdate } from "./controller/controllerCall"
import { deleteUser, getUsers, setUser, updateUser, login } from "./controller/controllerUsers"
import { verifyAuth } from "./controller/controllerAuth"

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

app.post('/auth/login', login)

app.post('/api/user/users', verifyAuth, getUsers)
app.post('/api/user/set', setUser)
app.put('/api/user/update', updateUser)
app.delete('/api/user/delete', deleteUser)

export { app }
