import { Router } from "express"
import acceptReq from "../controllers/friendReq/acceptReq.js"
import cancelRequest from "../controllers/friendReq/deleteReq.js"
import friendRequest from "../controllers/friendReq/friendRequest.js"

const router = Router()

router.post("/", friendRequest)

router.patch("/:id", acceptReq)

router.delete("/:id", cancelRequest)

export default router
