import express from "express"
import { getAllCalls, setCall, routerUpdate } from "./controller/controllerCall"

const app = express()

app.use(express.json())

app.get('/', getAllCalls)
app.post('/call/set', setCall)
app.put('/call/updateStatus', routerUpdate)

app.post('/user/User', )
app.put('/user/update', )
app.delete('/user/delete', )

export { app }
