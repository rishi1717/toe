import { Router } from "express"
import getRequests from "../controllers/matches/getRequests.js"
import getSentRequests from "../controllers/matches/getSentRequests.js"
import makeMove from "../controllers/matches/makeMove.js"
import matchAccept from "../controllers/matches/matchAccept.js"
import matchRequest from "../controllers/matches/matchRequest.js"

const router = Router()

router.get('/:id', getRequests)

router.get('/sentrequests/:id/', getSentRequests)

router.post("/", matchRequest)

router.patch("/:id", matchAccept )

router.patch('/move/:id', makeMove)

export default router