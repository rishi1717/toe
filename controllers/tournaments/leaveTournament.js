import Tournaments from "../../models/tournamentModel.js"

const leaveTournament = async (req, res) => {
	try {
		const { id } = req.params
		const { user } = req.body
		const tournament = await Tournaments.findById(id)
		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" })
		}
		tournament.players = tournament.players.filter(
			(player) => player.toString() !== user.toString()
		)
		tournament.remainingPlayers = tournament.remainingPlayers.filter(
			(player) => player.toString() !== user.toString()
		)
		tournament.playersJoined -= 1
		tournament.save()
		res.status(200).send({ message: "Tournament left", tournament })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default leaveTournament
