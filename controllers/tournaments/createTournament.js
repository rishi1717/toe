import Tournaments from "../../models/tournamentModel.js"

const createTournament = async (req, res) => {
	try {
		const { name, noOfPlayers, pointsToWin, entryFee, host, closed } =
			req.body
		const winnerAmount = entryFee * noOfPlayers * 0.6
		const runnerUpAmount = entryFee * noOfPlayers * 0.3
		const income = entryFee * noOfPlayers * 0.1
		const tournament = new Tournaments({
			name,
			noOfPlayers,
			pointsToWin,
			entryFee,
			winnerAmount,
			runnerUpAmount,
			income,
			closed,
			status: "pending",
			tournamentDate: new Date(),
			host,
			players: [host],
			playersJoined: 1,
            remainingPlayers: [host],
		})
		tournament.save()
		res.status(200).send({ message: "Tournament created", tournament })
	} catch (err) {
		console.log(err.message)
		res.status(500).send({
			message: "Internal server error",
			err: err.message,
		})
	}
}

export default createTournament
