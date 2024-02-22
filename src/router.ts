import express from "express"
import { callList } from './models/listCall'

const router = express.Router()

router.get('/', (req, res) => res.send(callList))
router.post('/setCall', (req, res) => {
    const called = req.body
    console.log(called)
})

export default router
