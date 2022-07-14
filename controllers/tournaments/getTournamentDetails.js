import Tournaments from "../../models/tournamentModel.js"

const getTournamentDetails = async (req, res) => {
	try {
		const { id } = req.params
		const tournament = await Tournaments.findById(id)
		if (!tournament) {
			return res.status(404).json({ message: "Tournament not found" })
		}
		res.status(200).send({ message: "Tournament found", tournament })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default getTournamentDetails
