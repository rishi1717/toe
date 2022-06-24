import { Router } from "express"
import guestRegister from "../controllers/guests/guestRegister.js"

const router = Router()

router.post("/", guestRegister)

router.get("/", (req, res) => {
	res.send("guest details")
})

export default router
