import sendMessage from "../controllers/matches/sendMessage.js"
import Users from "../models/userModel.js"

export default (io, socket) => {
	let userId = null
	socket.on("online", async (data) => {
		userId = data._id
		await Users.findOneAndUpdate(
			{ _id: data._id },
			{ $set: { active: true } },
			{ new: true }
		)
		socket.broadcast.emit("onlineUpdate")
	})

	socket.on("setup", (userData) => {
		socket.join(userData._id)
		console.log(`${userData._id} has joined`)
		socket.emit("connected")
	})

	socket.on("joinMatch", (room) => {
		socket.join(room)
		console.log(`joined the room ${room}`)
	})

	socket.on("newMessage", async (newMessage) => {
		console.log("newMessage")
		const match = await sendMessage(newMessage)

		if (newMessage.matchData.player1._id !== newMessage.sender) {
			socket
				.in(newMessage.matchData.player1._id)
				.emit("messageRecieved", match)
		} else if (newMessage.matchData.player2._id !== newMessage.sender) {
			socket
				.in(newMessage.matchData.player2._id)
				.emit("messageRecieved", match)
		}
	})

	socket.on("makeMove", async (data) => {
		console.log("makeMove")
		const sentTo =
			data.match.player1._id === data.user
				? data.match.player2._id
				: data.match.player1._id
		socket.in(sentTo).emit("moveMade", data)
	})

	socket.on("disconnect", async (socket) => {
		try {
			console.log(userId)
			await Users.updateOne(
				{ _id: userId},
				{ $set: { active: false } }
			)
			// socket.broadcast.emit("onlineUpdate")
		} catch (err) {
			console.log(err.message)
		}
	})
}
