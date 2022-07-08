import { Router } from "express"
import makeMove from "../controllers/matches/makeMove.js"
import matchAccept from "../controllers/matches/matchAccept.js"
import matchRequest from "../controllers/matches/matchRequest.js"

const router = Router()

router.post("/", matchRequest)

router.patch("/:id", matchAccept )

router.patch('/move/:id', makeMove)

export default router