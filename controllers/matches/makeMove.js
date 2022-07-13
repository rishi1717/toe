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
		let winner1 = false,
			winner2 = false
		const { player, move } = req.body
		const matchId = req.params.id
		let match = await Matches.findByIdAndUpdate(
			matchId,
			{
				$push: {
					[`${player}Moves`]: move,
				},
			},
			{ new: true }
		).populate("player1 player2")

		for (let line of lines) {
			winner1 = line.every((index) => {
				return match.player1Moves.includes(index)
			})
			winner2 = line.every((index) => {
				return match.player2Moves.includes(index)
			})
			if (winner1) {
				match = await Matches.findByIdAndUpdate(
					matchId,
					{
						$set: { winner: match.player1 },
					},
					{ new: true }
				).populate("player1 player2 winner")
				global.io.emit("matchUpdate", match)
				return res.status(200).json({ message: "Match won!", match })
			}
			if (winner2) {
				match = await Matches.findByIdAndUpdate(
					matchId,
					{
						$set: { winner: match.player2 },
					},
					{ new: true }
				).populate("player1 player2 winner")
				global.io.emit("matchUpdate",{})
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
