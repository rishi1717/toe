import TournamentMatches from "../../models/tournamentMatchesModel.js"

const startTournamentMatch = async (req, res) => {
	const { player1, player2, pointsToWin } = req.body
	const { _id } = await new TournamentMatches({
		player1,
		player2,
		pointsToWin,
		status: "requested",
	}).save()

	const match = await TournamentMatches.findOne({ _id }).populate(
		"player1 player2"
	)
	console.log(match)
	// global.io.emit("matchRequest", match)

	res.status(200).json({ message: "Match request sent!", match })
}

export default startTournamentMatch
