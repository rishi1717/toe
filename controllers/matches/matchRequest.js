import Matches from "../../models/matchModel.js"

const matchRequest = async (req, res) => {
	try {
		const { player1, player2, entryFee } = req.body
		const winningAmount = entryFee * 2 * (9 / 10)
        const income = entryFee * 2 * (1 / 10)
		await new Matches({
			player1,
			player2,
			entryFee,
			winningAmount,
			income,
			status: "requested",
		}).save()
		const match = await Matches.findOne({ player1, player2 }).populate("player1 player2")
		res.status(200).json({ message: "Match request sent!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default matchRequest
