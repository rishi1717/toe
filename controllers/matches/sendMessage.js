import Matches from "../../models/matchModel.js"

const sendMessage = async (newMessage) => {
	try {
		const match = await Matches.findOne({ _id: newMessage.matchData._id })
		const message = {
			sender: newMessage.sender,
			message: newMessage.message,
		}
		if (match) {
			match.messages.push(message)
			await match.save()
			return match
		} else {
			console.log("match not found")
			return null
		}
	} catch (err) {
		console.log(err)
	}
}

export default sendMessage