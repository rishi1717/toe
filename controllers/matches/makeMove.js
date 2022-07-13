import Matches from "../../models/matchModel.js"

const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const makeMove = async (req, res) => {
	try {
		let winner = false
		const { player, move } = req.body
		const matchId = req.params.id
		const match = await Matches.findByIdAndUpdate(
			matchId,
			{
				$push: {
					[`${player}Moves`]: move,
				},
			},
			{ new: true }
		)

		for (let line of lines) {
			winner = line.every((index) => {
				return (
					match.player1Moves.includes(index) ||
					match.player2Moves.includes(index)
				)
			})
			if (winner) {
				await Matches.findByIdAndUpdate(matchId, {
					$set: { winner: match.player1 },
				})
				return res.status(200).json({ message: "Match won!", match })
			}
		}

		if (!match) {
			return res.status(404).json({ message: "Match not found" })
		}
		if (match.status !== "accepted") {
			return res.status(400).json({ message: "Match not accepted" })
		}
		res.status(200).send({ message: "Move made!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default makeMove
