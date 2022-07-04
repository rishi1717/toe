import { Router } from "express"
import acceptReq from "../controllers/friendReq/acceptReq.js"
import cancelRequest from "../controllers/friendReq/deleteReq.js"
import friendRequest from "../controllers/friendReq/friendRequest.js"
import getRequests from "../controllers/friendReq/getRequests.js"
import getRequestsSent from "../controllers/friendReq/getRequestsSent.js"
import rejectReq from "../controllers/friendReq/rejectReq.js"
import removeFriend from "../controllers/friendReq/removeFriend.js"

const router = Router()

router.post("/", friendRequest)

router.get("/:id", getRequests)

router.get("/sent/:id", getRequestsSent)

router.patch("/accept/:id", acceptReq)

router.patch("/reject/:id", rejectReq)

router.patch("/remove/:id", removeFriend)

router.delete("/:id", cancelRequest)

export default router
