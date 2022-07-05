import { Router } from "express"
import matchAccept from "../controllers/matches/matchAccept.js"
import matchRequest from "../controllers/matches/matchRequest.js"

const router = Router()

router.post("/", matchRequest)

router.patch("/:id", matchAccept )

export default router