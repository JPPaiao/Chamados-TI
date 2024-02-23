import express from "express"
import { getAllCalls, setCall, routerUpdate } from "./controller/controllerCall"
import { deleteUser, getUsers, setUser, updateUser } from "./controller/controllerUsers"

const app = express()

app.use(express.json())

app.get('/', getAllCalls)
app.post('/call/set', setCall)
app.put('/call/updateStatus', routerUpdate)

app.post('/user/users', getUsers)
app.post('/user/set', setUser)
app.put('/user/update', updateUser)
app.delete('/user/delete', deleteUser)

export { app }
