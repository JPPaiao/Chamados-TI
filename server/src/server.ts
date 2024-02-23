import cors from "cors"
import "./models/listCall"
import { app } from "./router"

// app.use(cors)

app.listen(3000, () => console.log('Server running...'))
