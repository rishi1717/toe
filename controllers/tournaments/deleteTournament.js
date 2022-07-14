import Tournaments from "../../models/tournamentModel.js"

const deleteTournament = async (req, res) => {
	try {
		const { id } = req.params
		const tournament = await Tournaments.findById(id)
		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" })
		}
		tournament.remove()
		res.status(200).send({ message: "Tournament deleted" })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default deleteTournament
