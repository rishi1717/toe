import TournamentMatches from "../../models/tournamentMatchesModel.js"

const getTournamentMatchDetails = async (req, res) => {
	try {
		const { id } = req.params
		const match = await TournamentMatches.findOne({ _id: id }).populate(
			"player1 player2 winner"
		)
		res.status(200).json({ message: "Match details fetched!", match })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: "Error fetching match details!", err })
	}
}

export default getTournamentMatchDetails
