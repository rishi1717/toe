import Matches from "../../models/matchModel.js"

const getMatchDetails = async (req, res) => {
	try {
		const matchId = req.params.id
		const match = await Matches.findById(matchId).populate("player1 player2")
		res.status(200).send({ message: "details!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default getMatchDetails
