import Tournaments from "../../models/tournamentModel.js"

const getTournaments = async (req, res) => {
	try {
		const tournaments = await Tournaments.find({
			status: "pending",
			$expr: { $gt: ["$noOfPlayers", "$playersJoined"] },
		})
		res.status(200).send({ message: "Tournaments found", tournaments })
	} catch (err) {
		console.log(err.message)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default getTournaments
