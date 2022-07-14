import Tournaments from "../../models/tournamentModel.js"

const updateTournament = async (req, res) => {
	try {
		const { id } = req.params
		const { eliminatedPlayer } = req.body
		const tournament = await Tournaments.findById(id)
		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" })
		}
		tournament.eliminated.push(eliminatedPlayer)
		await tournament.updateOne(
			{ _id: id },
			{ $pull: { remainingPlayers: eliminatedPlayer } }
		)
		await tournament.save()
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default updateTournament
