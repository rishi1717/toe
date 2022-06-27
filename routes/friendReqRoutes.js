import { Router } from "express"
import friendRequest from "../controllers/friendReq/friendRequest.js"

const router = Router()

router.post("/", friendRequest)

export default router
