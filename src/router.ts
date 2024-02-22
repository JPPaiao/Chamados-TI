import express from "express"
import { getAllCalls, setCall, routerUpdate } from "./controller/controllerCall"

const app = express()

app.use(express.json())

app.get('/', getAllCalls)

app.post('/setCall', setCall)

app.put('/updateStatus', routerUpdate)

export { app }
