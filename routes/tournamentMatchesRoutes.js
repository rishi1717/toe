import { Router } from "express"
import getTournamentMatchDetails from "../controllers/tournamentmatches/getTournamentMatchDetails.js"
import makeTournamentMove from "../controllers/tournamentmatches/makeTournamentMove.js"
import startTournamentMatch from "../controllers/tournamentmatches/startTournamentMatch.js"

const router = Router()

router.post("/", startTournamentMatch)

router.get("/:id", getTournamentMatchDetails)

router.patch("/move/:id", makeTournamentMove)

export default router
