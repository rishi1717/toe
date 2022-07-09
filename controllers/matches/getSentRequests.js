import Matches from "../../models/matchModel.js"

const getSentRequests = async (req, res) => {
	try {
		const userId = req.params.id
		const matches = await Matches.find({
			player1: userId,
			status: "requested",
		}).populate("player2")
		const requests = matches.map((match) => {
			return match.player2._id
		})
		res.status(200).json(requests)
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default getSentRequests
