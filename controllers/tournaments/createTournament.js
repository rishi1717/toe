import Tournaments from "../../models/tournamentModel.js"

const createTournament = async (req, res) => {
	try {
		const { name, noOfPlayers, pointsToWin, entryFee, host } = req.body
		const winnerAmount = entryFee * numberOfPlayers * 0.6
		const runnerUpAmount = entryFee * numberOfPlayers * 0.3
		const income = entryFee * numberOfPlayers * 0.1
		const tournament = new Tournaments({
			name,
			noOfPlayers,
			pointsToWin,
			entryFee,
			winnerAmount,
			runnerUpAmount,
			income,
			status: "pending",
			tournamentDate: new Date(),
			host,
			players: [host],
			playersJoined: 1,
		})
		tournament.save()
		res.status(200).send({ message: "Tournament created", tournament })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default createTournament
