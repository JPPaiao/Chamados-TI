import express from "express"
import router from "./router"
import "./models/listCall"

const app = express()

app.use(router)

app.listen(3000, () => console.log('Server running...'))
