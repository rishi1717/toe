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
			winner2 = false,
			points1 = false,
			points2 = false
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
		).populate("player1 player2 winner")

		if (!match) {
			return res.status(404).json({ message: "Match not found" })
		}
		if (match.status !== "accepted") {
			return res.status(400).json({ message: "Match not accepted" })
		}

		winner1 = match.player1Points === match.pointsToWin
		winner2 = match.player2Points === match.pointsToWin
		if (winner1) {
			match = await Matches.findByIdAndUpdate(
				matchId,
				{
					$set: { winner: match.player1 },
				},
				{ new: true }
			).populate("player1 player2 winner")
			global.io.emit("matchUpdate")
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
			global.io.emit("matchUpdate")
			return res.status(200).json({ message: "Match won!", match })
		}

		for (let line of lines) {
			points1 = line.every((index) => {
				return match.player1Moves.includes(index)
			})
			points2 = line.every((index) => {
				return match.player2Moves.includes(index)
			})
			if (points1) {
				match = await Matches.findByIdAndUpdate(
					{ _id: matchId },
					{
						$inc: { player1Points: 1 },
						$set: { player1Moves: [], player2Moves: [] },
					},
					{ new: true }
				).populate("player1 player2 winner")
				global.io.emit("pointUpdate")
				return res.status(200).json({ message: "Points won!", match })
			}
			if (points2) {
				match = await Matches.findByIdAndUpdate(
					{ _id: matchId },
					{
						$inc: { player2Points: 1 },
						$set: { player1Moves: [], player2Moves: [] },
					},
					{ new: true }
				).populate("player1 player2 winner")
				global.io.emit("pointUpdate")
				return res.status(200).json({ message: "Points won!", match })
			}
		}
		global.io.emit("matchUpdate")
		res.status(200).send({ message: "Move made!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default makeMove
