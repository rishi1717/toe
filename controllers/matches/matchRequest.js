import Matches from "../../models/matchModel.js"

const matchRequest = async (req, res) => {
	try {
		const { player1, player2, entryFee } = req.body
		const winningAmount = entryFee * 2 * (9 / 10)
        const income = entryFee * 2 * (1 / 10)
		const match = new Matches({
			player1,
			player2,
			entryFee,
			winningAmount,
			income,
			status: "requested",
		})
		await match.save()
		res.status(200).json({ message: "Match request sent!" })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default matchRequest
