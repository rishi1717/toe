import TournamentMatches from "../../models/tournamentMatchesModel.js"

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

const makeTournamentMove = async (req, res) => {
	try {
		let points1 = false,
			points2 = false
		const { player, move } = req.body
		const matchId = req.params.id
		let match = await TournamentMatches.findByIdAndUpdate(
			matchId,
			{
				$push: {
					[`${player}Moves`]: move,
				},
				turn: player === "player1" ? "player2" : "player1",
			},
			{ new: true }
		).populate("player1 player2 winner")

		if (!match) {
			return res.status(404).json({ message: "Match not found" })
		}

		if (match.player1Points === match.pointsToWin) {
			match = await TournamentMatches.findByIdAndUpdate(
				matchId,
				{
					$set: { winner: match.player1 },
				},
				{ new: true }
			).populate("player1 player2 winner")
			// global.io.emit("winnerUpdate")
			return res.status(200).json({ message: "Match won!", match })
		}
		if (match.player2Points === match.pointsToWin) {
			match = await TournamentMatches.findByIdAndUpdate(
				matchId,
				{
					$set: { winner: match.player2 },
				},
				{ new: true }
			).populate("player1 player2 winner")
			// global.io.emit("winnerUpdate")
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
				match = await TournamentMatches.findByIdAndUpdate(
					{ _id: matchId },
					{
						$inc: { player1Points: 1 },
						$set: { player1Moves: [], player2Moves: [] },
					},
					{ new: true }
				).populate("player1 player2 winner")

				if (match.player1Points === match.pointsToWin) {
					match = await TournamentMatches.findByIdAndUpdate(
						matchId,
						{
							$set: { winner: match.player1 },
						},
						{ new: true }
					).populate("player1 player2 winner")
					// global.io.emit("winnerUpdate")
					return res.status(200).json({ message: "Match won!", match })
				}

				global.io.emit("pointUpdate")
				return res.status(200).json({ message: "Points won!", match })
			}
			if (points2) {
				match = await TournamentMatches.findByIdAndUpdate(
					{ _id: matchId },
					{
						$inc: { player2Points: 1 },
						$set: { player1Moves: [], player2Moves: [] },
					},
					{ new: true }
				).populate("player1 player2 winner")
				if (match.player2Points === match.pointsToWin) {
					match = await TournamentMatches.findByIdAndUpdate(
						matchId,
						{
							$set: { winner: match.player2 },
						},
						{ new: true }
					).populate("player1 player2 winner")
					// global.io.emit("winnerUpdate")
					return res.status(200).json({ message: "Match won!", match })
				}
				global.io.emit("pointUpdate")
				return res.status(200).json({ message: "Points won!", match })
			}
		}

		if (
			match.player1Moves.length + match.player2Moves.length === 9 ||
			match.player1Moves.length === 5 ||
			match.player2Moves.length === 5
		) {
			match = await TournamentMatches.findByIdAndUpdate(
				matchId,
				{
					$set: { player1Moves: [], player2Moves: [] },
				},
				{ new: true }
			).populate("player1 player2 winner")
			global.io.emit("pointUpdate")
			return res.status(200).json({ message: "Match draw!", match })
		}

		// global.io.emit("matchUpdate")
		res.status(200).send({ message: "Move made!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default makeTournamentMove
