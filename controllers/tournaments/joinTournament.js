import Tournaments from "../../models/tournamentModel.js"

const joinTournament = async (req, res) => {
	try {
		const { id } = req.params
		const { user } = req.body
		const tournament = await Tournaments.findById(id)
		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" })
		}
        tournament.players.push(user)
        tournament.remainingPlayers.push(user)
        tournament.playersJoined += 1
        tournament.save()
        res.status(200).send({ message: "Tournament joined", tournament })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default joinTournament
