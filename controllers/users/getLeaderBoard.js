import Users from "../../models/userModel.js"

const getLeaderBoard = async (req, res) => {
	try {
		const mostWins = await Users.find().sort({ matchesWon: -1 }).limit(10)
		const mostEarnings = await Users.find().sort({ amountWon: -1 }).limit(10)
		const winRatio = await Users.find({}).sort({ winRatio: -1 }).limit(10)
		res.status(200).send({ mostWins, mostEarnings, winRatio })
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default getLeaderBoard
