import express from "express"
import { getAllCalls, setCall, routerUpdate } from "./controller/controllerCall"
import { deleteUser, setUser, updateUser } from "./controller/controllerUsers"

const app = express()

app.use(express.json())

app.get('/', getAllCalls)
app.post('/call/set', setCall)
app.put('/call/updateStatus', routerUpdate)

app.post('/user/User', setUser)
app.put('/user/update', updateUser)
app.delete('/user/delete', deleteUser)

export { app }
