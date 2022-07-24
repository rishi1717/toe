import Tournaments from "../../models/tournamentModel.js"

const joinTournament = async (req, res) => {
	try {
		const { id } = req.params
		const { user } = req.body
		const tournament = await Tournaments.findById(id)
		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" })
		}
		if (tournament.playersJoined >= tournament.noOfPlayers) {
			return res.status(400).json({ message: "Tournament is full" })
		}
		if (
			 tournament.players.map((player) => player.toString()).includes(user)
		) {
			return res
				.status(201)
				.json({ message: "User already joined", tournament })
		}
		tournament.players.push(user)
		tournament.remainingPlayers.push(user)
		tournament.playersJoined += 1
		if (tournament.playersJoined === tournament.noOfPlayers) {
			tournament.status = "ongoing"
		}
		tournament.save()
		// global.io.emit("playerJoined", tournament)
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
