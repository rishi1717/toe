import { Router } from "express"
import createTournament from "../controllers/tournaments/createTournament.js"
import deleteTournament from "../controllers/tournaments/deleteTournament.js"
import getTournamentDetails from "../controllers/tournaments/getTournamentDetails.js"
import getTournaments from "../controllers/tournaments/getTournaments.js"
import joinTournament from "../controllers/tournaments/joinTournament.js"
import leaveTournament from "../controllers/tournaments/leaveTournament.js"
import updateTournament from "../controllers/tournaments/updateTournament.js"

const router = Router()

router.post("/", createTournament)

router.get("/:id", getTournamentDetails)

router.get("/", getTournaments)

router.patch("/join/:id", joinTournament)

router.patch("/leave/:id", leaveTournament)

router.patch("/:id", updateTournament)

router.delete("/:id", deleteTournament)

export default router