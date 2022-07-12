import Matches from "../../models/matchModel.js"

const matchAccept = async (req, res) => {
	try {
		const matchId = req.params.id
		const match = await Matches.findByIdAndUpdate(matchId, { $set: { status: "accepted" } }).populate("player1 player2")
        res.status(200).json({ message: "Match accepted!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default matchAccept
