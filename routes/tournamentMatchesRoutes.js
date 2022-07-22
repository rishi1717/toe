import { Router } from "express"
import startTournamentMatch from "../controllers/tournamentmatches/startTournamentMatch.js"

const router = Router()

router.post("/", startTournamentMatch)

export default router