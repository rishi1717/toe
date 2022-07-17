import Tournaments from "../../models/tournamentModel.js"

const sendTournamentMessage = async (newMessage) => {
	try {
		const tournament = await Tournaments.findOne({
			_id: newMessage.tournamentData._id,
		})
		const message = {
			sender: newMessage.sender,
            senderId: newMessage.senderId,
			message: newMessage.message,
		}
		if (tournament) {
			tournament.messages.push(message)
			await tournament.save()
			return tournament
		} else {
			console.log("tournament not found")
			return null
		}
	} catch (err) {
		console.log(err)
	}
}

export default sendTournamentMessage
