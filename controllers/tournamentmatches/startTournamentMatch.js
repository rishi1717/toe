import TournamentMatches from "../../models/tournamentMatchesModel.js"

const startTournamentMatch = async (req, res) => {
	const { player1, player2, pointsToWin } = req.body

	const tournamentMatch = await TournamentMatches.findOne({
		player1,
		player2,
	}).populate("player1 player2")

	if (tournamentMatch) {
		return res
			.status(200)
			.json({ message: "Match started!", match: tournamentMatch })
	}

	const { _id } = await new TournamentMatches({
		player1,
		player2,
		pointsToWin,
		status: "requested",
	}).save()

	const match = await TournamentMatches.findOne({ _id }).populate(
		"player1 player2"
	)
	// global.io.emit("matchRequest", match)

	res.status(200).json({ message: "Match started!", match })
}

export default startTournamentMatch
