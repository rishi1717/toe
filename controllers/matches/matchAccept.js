import Matches from "../../models/matchModel.js"

const matchAccept = async (req, res) => {
	try {
		const matchId = req.params.id
		await Matches.findByIdAndUpdate(matchId, { $set: { status: "accepted" } })
        res.status(200).json({ message: "Match accepted!" })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default matchAccept
