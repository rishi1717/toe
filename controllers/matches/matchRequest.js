import Matches from "../../models/matchModel.js"

const matchRequest = async (req, res) => {
	try {
		const { player1, player2, entryFee, pointsToWin, winningAmount } =
			req.body
		const income = entryFee * 2 - winningAmount
		const { _id } = await new Matches({
			player1,
			player2,
			entryFee,
			pointsToWin,
			winningAmount,
			income,
			status: "requested",
		}).save()

		const match = await Matches.findOne({ _id }).populate("player1 player2")

		global.io.emit("matchRequest", match)

		res.status(200).json({ message: "Match request sent!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default matchRequest
