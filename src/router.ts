import express from "express"
import { getAllCalls, setCall } from "./controller/call"

const app = express()

app.use(express.json())

app.get('/', getAllCalls)

app.post('/setCall', setCall)

export { app }
