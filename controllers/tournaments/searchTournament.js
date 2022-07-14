import Tournaments from "../../models/tournamentModel.js"

const searchTournament = async (req, res) => {
	try {
		const { search } = req.query
		const tournaments = await Tournaments.find({
			name: { $regex: search, $options: "i" },
		})
		res.status(200).send({ message: "Tournaments found", tournaments })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default searchTournament
